"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProductFormProps {
  initialData?: {
    id?: string;
    name: string;
    price: number;
    image: string;
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
    image: initialData?.image || "/images/placeholder.svg",
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
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) {
        setForm((prev) => ({ ...prev, image: data.url }));
      } else {
        setError(data.error || "Upload failed");
      }
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
    }
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
        body: JSON.stringify(form),
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
        <div className="flex gap-2">
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

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">Product Image</label>
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
            <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="text-sm"
            />
            {uploading && <p className="text-xs text-gray-500 mt-1">Uploading...</p>}
          </div>
        </div>
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
