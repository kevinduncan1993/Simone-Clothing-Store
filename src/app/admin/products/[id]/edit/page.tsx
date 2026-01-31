"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import ProductForm from "@/components/admin/ProductForm";

export default function EditProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [params.id]);

  return (
    <AdminLayout>
      <h1 className="font-heading text-2xl font-black uppercase tracking-tight mb-8">Edit Product</h1>
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : product ? (
        <ProductForm initialData={product} />
      ) : (
        <p className="text-red-500">Product not found.</p>
      )}
    </AdminLayout>
  );
}
