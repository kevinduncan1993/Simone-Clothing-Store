"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => setStats((s) => ({ ...s, products: data.length || 0 })));

    fetch("/api/orders")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRecentOrders(data.slice(0, 5));
          setStats((s) => ({
            ...s,
            orders: data.length,
            revenue: data.reduce((sum: number, o: any) => sum + (o.total || 0), 0),
          }));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <AdminLayout>
      <h1 className="font-heading text-2xl font-black uppercase tracking-tight mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Products</p>
          <p className="font-heading text-3xl font-black mt-1">{stats.products}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Orders</p>
          <p className="font-heading text-3xl font-black mt-1">{stats.orders}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Revenue</p>
          <p className="font-heading text-3xl font-black mt-1 text-accent">${stats.revenue.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <Link
          href="/admin/products/new"
          className="bg-accent text-white px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-accent-light transition-colors"
        >
          Add Product
        </Link>
        <Link
          href="/admin/products"
          className="border-2 border-gray-200 px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-widest hover:border-accent transition-colors"
        >
          View All Products
        </Link>
      </div>

      {recentOrders.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-heading text-sm font-black uppercase tracking-wider">Recent Orders</h2>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-400">Order ID</th>
                <th className="text-left px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-400">Total</th>
                <th className="text-left px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-t border-gray-50">
                  <td className="px-4 py-3 font-mono text-xs">{order.id.slice(0, 8)}...</td>
                  <td className="px-4 py-3 font-bold">${order.total?.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${
                      order.status === "completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
