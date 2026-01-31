"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-green-600 text-3xl">&#10003;</span>
        </div>
        <h1 className="font-heading text-3xl font-black uppercase tracking-tight mb-4">
          Order Confirmed
        </h1>
        <p className="text-gray-500 mb-2">Thank you for your purchase!</p>
        {orderId && (
          <p className="text-xs text-gray-400 font-mono mb-6">Order ID: {orderId}</p>
        )}
        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-dark to-charcoal text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:from-accent hover:to-accent-light transition-all"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream flex items-center justify-center"><p>Loading...</p></div>}>
      <SuccessContent />
    </Suspense>
  );
}
