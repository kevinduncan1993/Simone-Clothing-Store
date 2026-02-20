"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProductFormProps {
  initialData?: {
    id?: string;
    name: string;
    price: number;
    image: string;
    images?: string[];
    description: string;
    sizes: string[];
    category: string;
    rating: number;
    reviews: string;
  };
}

const categoryOptions = ["Men", "Women", "Accessories", "Limited Edition"];

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const isEditing = !!initialData?.id;

  const [form, setForm] = useState({
    name: initialData?.name || "",
    price: initialData?.price || 0,
    images: initialData?.images?.length
      ? initialData.images
      : initialData?.image && initialData.image !== "/images/placeholder.svg"
      ? [initialData.image]
      : [],
    description: initialData?.description || "",
    sizes: initialData?.sizes || ["S", "M", "L", "XL"],
    category: initialData?.category || "Men",
    rating: initialData?.rating || 5,
    reviews: initialData?.reviews || "0",
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newUrls: string[] = [];

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (res.ok) {
          newUrls.push(data.url);
        } else {
          setError(data.error || "Upload failed");
          break;
        }
      }
      if (newUrls.length > 0) {
        setForm((prev) => ({ ...prev, images: [...prev.images, ...newUrls] }));
      }
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
      // Reset input so the same file can be re-selected if needed
      e.target.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSizeToggle = (size: string) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const url = isEditing ? `/api/products/${initialData!.id}` : "/api/products";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          image: form.images[0] ?? "/images/placeholder.svg",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to save");
        return;
      }

      router.push("/admin/products");
      router.refresh();
    } catch {
      setError("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">{error}</div>}

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">Product Name</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          required
          className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent transition-colors"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">Price ($)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={form.price}
            onChange={(e) => setForm((p) => ({ ...p, price: parseFloat(e.target.value) || 0 }))}
            required
            className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
            className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent transition-colors"
          >
            {categoryOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
          rows={3}
          className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent transition-colors resize-none"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">Sizes</label>
        <div className="flex gap-2 flex-wrap">
          {["XS", "S", "M", "L", "XL", "XXL", "One Size"].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => handleSizeToggle(size)}
              className={`px-3 py-1.5 text-xs font-bold rounded-full border-2 transition-all ${
                form.sizes.includes(size)
                  ? "bg-accent text-white border-accent"
                  : "border-gray-200 text-gray-400 hover:border-accent"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">Rating (1-5)</label>
          <input
            type="number"
            min="1"
            max="5"
            value={form.rating}
            onChange={(e) => setForm((p) => ({ ...p, rating: parseInt(e.target.value) || 5 }))}
            className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">Reviews Count</label>
          <input
            type="text"
            value={form.reviews}
            onChange={(e) => setForm((p) => ({ ...p, reviews: e.target.value }))}
            className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>

      {/* Multi-image section */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider mb-1">Product Images</label>
        <p className="text-xs text-gray-400 mb-3">(first image is the cover shown in the shop)</p>

        {form.images.length > 0 && (
          <div className="grid grid-cols-4 gap-2 mb-3">
            {form.images.map((src, i) => (
              <div key={i} className="relative group">
                <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
                  <img src={src} alt={`Product image ${i + 1}`} className="w-full h-full object-cover" />
                </div>
                {i === 0 && (
                  <span className="absolute bottom-1 left-1 bg-accent text-dark text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded">
                    Cover
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveImage(i)}
                  className="absolute top-1 right-1 w-5 h-5 bg-black/70 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove image"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <label className="inline-flex items-center gap-2 cursor-pointer px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-accent hover:text-accent transition-colors">
          {uploading ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Uploading...
            </>
          ) : (
            <>+ Add Photo</>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={saving || uploading}
          className="bg-gradient-to-r from-dark to-charcoal text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:from-accent hover:to-accent-light transition-all disabled:opacity-50"
        >
          {saving ? "Saving..." : isEditing ? "Update Product" : "Create Product"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest border-2 border-gray-200 hover:border-accent transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
