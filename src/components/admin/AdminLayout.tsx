"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/about", label: "About" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-dark text-white flex flex-col shrink-0">
        <div className="p-5 border-b border-white/10">
          <Link href="/admin" className="font-heading text-xl font-black uppercase tracking-tight">
            <span className="text-white">SIM</span>
            <span className="text-accent">ONE</span>
          </Link>
          <p className="text-[10px] uppercase tracking-widest text-warm/60 mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "bg-accent text-white"
                  : "text-warm/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10 space-y-1">
          <Link
            href="/"
            className="block px-3 py-2.5 rounded-lg text-sm text-warm/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            View Store
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-warm/70 hover:bg-red-500/20 hover:text-red-400 transition-colors"
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
