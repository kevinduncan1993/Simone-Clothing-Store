"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

function Stars({ count }: { count: number }) {
  return (
    <span className="text-warm text-lg tracking-wider">
      {"★".repeat(count)}
      <span className="text-cream-dark">{"★".repeat(5 - count)}</span>
    </span>
  );
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] ?? "");
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-dark transition-colors mb-8"
        >
          ← Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Image */}
          <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-cream-dark to-cream shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center gap-6">
            <div>
              <span className="bg-accent text-dark text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                {product.category}
              </span>
            </div>

            <h1 className="font-heading text-3xl md:text-4xl font-black uppercase tracking-wider leading-tight">
              {product.name}
            </h1>

            <span className="font-heading text-3xl font-black text-accent">
              ${product.price}
            </span>

            <div className="flex items-center gap-3">
              <Stars count={product.rating} />
              <span className="text-sm text-gray-400 tracking-wide">({product.reviews})</span>
            </div>

            {product.description && (
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            )}

            {/* Size selector */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Select Size</p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2.5 text-sm font-bold rounded-full transition-all duration-200 ${
                      selectedSize === size
                        ? "bg-accent text-dark scale-105"
                        : "bg-white text-dark border border-gray-200 hover:border-accent"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAdd}
              className={`w-full md:w-auto md:px-12 py-3.5 text-sm font-bold uppercase tracking-[0.15em] rounded-full transition-all duration-300 ${
                added
                  ? "bg-olive text-white"
                  : "bg-gradient-to-r from-dark to-charcoal text-white hover:from-accent hover:to-accent-light shadow-md hover:shadow-lg"
              }`}
            >
              {added ? "Added!" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
