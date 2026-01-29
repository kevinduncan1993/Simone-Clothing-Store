"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

function Stars({ count }: { count: number }) {
  return (
    <span className="text-warm text-sm tracking-wider">
      {"★".repeat(count)}
      <span className="text-cream-dark">{"★".repeat(5 - count)}</span>
    </span>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleAdd = () => {
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div
      className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-cream-dark to-cream relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-accent text-dark text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        {/* Size selector overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/30 to-transparent flex items-end justify-center pb-6 transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}>
          <div className="flex gap-1.5">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={(e) => { e.stopPropagation(); setSelectedSize(size); }}
                className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all duration-200 ${
                  selectedSize === size
                    ? "bg-accent text-dark scale-110"
                    : "bg-warm text-dark hover:bg-accent hover:text-dark"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-cream-dark/50">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-xs font-bold uppercase tracking-wider leading-tight">{product.name}</h3>
          <span className="font-heading text-base font-black text-accent whitespace-nowrap">${product.price}</span>
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <Stars count={product.rating} />
          <span className="text-[10px] text-gray-400 tracking-wide">({product.reviews})</span>
        </div>
        <button
          onClick={handleAdd}
          className={`mt-3 w-full py-2.5 text-xs font-bold uppercase tracking-[0.15em] rounded-full transition-all duration-300 ${
            added
              ? "bg-olive text-white"
              : "bg-gradient-to-r from-dark to-charcoal text-white hover:from-accent hover:to-accent-light shadow-md hover:shadow-lg"
          }`}
        >
          {added ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
