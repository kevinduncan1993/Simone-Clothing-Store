"use client";

import { useCart } from "@/lib/cart";

export default function CartDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } =
    useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl">
        <div className="flex items-center justify-between border-b border-warm/20 p-6">
          <h2 className="font-heading text-lg font-black uppercase tracking-wide">Your Cart</h2>
          <button onClick={onClose} className="text-2xl leading-none hover:text-accent transition-colors">
            &times;
          </button>
        </div>

        {items.length === 0 ? (
          <p className="mt-8 text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex items-center gap-4 border-b border-warm/10 py-4"
                >
                  <div className="h-16 w-16 rounded-lg overflow-hidden bg-cream-dark">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm uppercase tracking-wide">{item.product.name}</p>
                    <p className="text-xs text-warm">Size: {item.size}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.size, item.quantity - 1)
                        }
                        className="flex h-6 w-6 items-center justify-center rounded bg-cream-dark text-sm font-bold hover:bg-accent hover:text-white transition-colors"
                      >
                        -
                      </button>
                      <span className="text-sm font-bold">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.size, item.quantity + 1)
                        }
                        className="flex h-6 w-6 items-center justify-center rounded bg-cream-dark text-sm font-bold hover:bg-accent hover:text-white transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-accent">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.product.id, item.size)}
                      className="mt-1 text-xs text-gray-400 hover:text-accent transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-warm/20 p-6 bg-cream-dark">
              <div className="flex justify-between text-lg font-heading font-black uppercase">
                <span>Total</span>
                <span className="text-accent">${totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={async () => {
                  try {
                    const res = await fetch("/api/checkout", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        items: items.map((item) => ({
                          productId: item.product.id,
                          name: item.product.name,
                          price: item.product.price,
                          size: item.size,
                          quantity: item.quantity,
                        })),
                      }),
                    });
                    const data = await res.json();
                    if (data.url) {
                      window.location.href = data.url;
                    } else {
                      alert("Checkout failed. Please try again.");
                    }
                  } catch {
                    alert("Checkout failed. Please try again.");
                  }
                }}
                className="mt-4 w-full rounded-full bg-dark py-3.5 text-center text-white text-sm font-bold uppercase tracking-widest hover:bg-accent transition-colors"
              >
                Checkout
              </button>
              <button
                onClick={clearCart}
                className="mt-2 w-full text-center text-xs text-gray-500 hover:text-accent transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
