"use client";

import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-red-500 text-3xl">&#10005;</span>
        </div>
        <h1 className="font-heading text-3xl font-black uppercase tracking-tight mb-4">
          Payment Cancelled
        </h1>
        <p className="text-gray-500 mb-6">
          Your payment was cancelled. Your cart items are still saved.
        </p>
        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-dark to-charcoal text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:from-accent hover:to-accent-light transition-all"
        >
          Back to Store
        </Link>
      </div>
    </div>
  );
}
