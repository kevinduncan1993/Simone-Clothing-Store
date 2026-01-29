"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const { totalItems } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            SIMONE
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm hover:underline">
              Shop
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-sm hover:underline"
            >
              Cart
              {totalItems > 0 && (
                <span className="absolute -right-4 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
