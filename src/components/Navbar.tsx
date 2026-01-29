"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const { totalItems } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top banner */}
      <div className="bg-gradient-to-r from-dark via-charcoal to-dark text-warm text-xs py-2.5 px-4 flex justify-between items-center">
        <span className="tracking-widest uppercase">Free shipping on all orders over $50</span>
        <span className="hidden sm:inline tracking-widest uppercase">Find stores & services</span>
      </div>

      {/* Main nav */}
      <nav className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-warm/20 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          {/* Left links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors">Home</Link>
            <a href="#shop" className="text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors">Shop</a>
            <a href="#collections" className="text-xs uppercase tracking-widest hover:text-accent transition-colors">Collections</a>
            <a href="#blog" className="text-xs uppercase tracking-widest hover:text-accent transition-colors">Blog</a>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="text-2xl md:text-3xl font-heading font-black tracking-tighter uppercase">
            <span className="text-dark">SIM</span>
            <span className="text-accent">ONE</span>
          </Link>

          {/* Right */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors"
            >
              Cart
              {totalItems > 0 && (
                <span className="absolute -right-5 -top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] text-white animate-pulse-glow">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-warm/20 bg-cream px-4 py-4 flex flex-col gap-3">
            <Link href="/" className="text-sm font-bold uppercase tracking-widest" onClick={() => setMenuOpen(false)}>Home</Link>
            <a href="#shop" className="text-sm font-bold uppercase tracking-widest" onClick={() => setMenuOpen(false)}>Shop</a>
            <a href="#collections" className="text-sm uppercase tracking-widest" onClick={() => setMenuOpen(false)}>Collections</a>
            <a href="#blog" className="text-sm uppercase tracking-widest" onClick={() => setMenuOpen(false)}>Blog</a>
          </div>
        )}
      </nav>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
