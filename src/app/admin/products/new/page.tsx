"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <AdminLayout>
      <h1 className="font-heading text-2xl font-black uppercase tracking-tight mb-8">Add New Product</h1>
      <ProductForm />
    </AdminLayout>
  );
}
