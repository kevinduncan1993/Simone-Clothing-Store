"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminAboutPage() {
  const [heading, setHeading] = useState("");
  const [body1, setBody1] = useState("");
  const [body2, setBody2] = useState("");
  const [image, setImage] = useState("/images/owner.svg");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/site-content/about")
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.error) {
          setHeading(data.heading || "");
          setBody1(data.body1 || "");
          setBody2(data.body2 || "");
          setImage(data.image || "/images/owner.svg");
        }
      })
      .catch(() => {});
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) setImage(data.url);
    } catch {
      setMessage("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/site-content/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heading, body1, body2, image }),
      });
      if (res.ok) setMessage("Saved successfully!");
      else setMessage("Failed to save");
    } catch {
      setMessage("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">About Section</h1>

        {/* Photo */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Photo</label>
          <div className="flex items-center gap-6">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 shrink-0 ring-4 ring-warm/20">
              <img src={image} alt="About" className="w-full h-full object-cover" />
            </div>
            <label className="cursor-pointer bg-dark text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent transition-colors">
              {uploading ? "Uploading..." : "Change Photo"}
              <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
            </label>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
          <input
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Body 1 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Paragraph 1</label>
          <textarea
            rows={4}
            value={body1}
            onChange={(e) => setBody1(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Body 2 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Paragraph 2</label>
          <textarea
            rows={4}
            value={body2}
            onChange={(e) => setBody2(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-accent text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-accent-light transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          {message && (
            <span className={`text-sm ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </span>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
