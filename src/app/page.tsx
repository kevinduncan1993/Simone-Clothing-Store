"use client";

import { useState } from "react";
import { products, categories, collections, testimonials } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-br from-cream via-cream to-cream-dark relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-warm/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28 flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1">
            <div className="inline-block bg-dark/5 backdrop-blur-sm border border-warm/20 rounded-full px-4 py-1.5 mb-6">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-warm">Premium Quality</span>
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tight">
              Unleash Your Style<br />
              <span className="text-accent">Wear the</span><br />
              <span className="text-accent">Revolution</span>
            </h1>
            <p className="mt-6 text-gray-600 max-w-md text-lg leading-relaxed">
              Bold streetwear meets modern minimalism — curated for the unapologetically stylish.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#shop"
                className="bg-gradient-to-r from-dark to-charcoal text-white px-7 py-3.5 rounded-full text-sm font-bold uppercase tracking-[0.15em] hover:from-accent hover:to-accent-light transition-all shadow-lg hover:shadow-xl"
              >
                Shop the Collection
              </a>
              <a
                href="#collections"
                className="border-2 border-dark px-7 py-3.5 rounded-full text-sm font-bold uppercase tracking-[0.15em] hover:bg-dark hover:text-white transition-all"
              >
                Explore Lookbook
              </a>
            </div>
            <div className="mt-12 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="font-heading text-4xl font-black">360K</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider leading-tight">Products<br />Delivered</span>
              </div>
              <div className="w-px h-10 bg-warm/30" />
              <div className="flex items-center gap-2">
                <span className="font-heading text-4xl font-black">50+</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider leading-tight">Countries<br />Worldwide</span>
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-80 h-[28rem] bg-gradient-to-br from-cream-dark to-warm/20 rounded-2xl flex items-center justify-center overflow-hidden shadow-2xl ring-1 ring-warm/20">
              <img
                src="/images/placeholder.svg"
                alt="Featured product"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SCROLLING MARQUEE BANNER ===== */}
      <div className="bg-gradient-to-r from-accent via-accent-light to-accent py-3.5 overflow-hidden shadow-lg">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="text-white font-heading font-black text-lg uppercase tracking-wider mx-8">
              New Arrivals &nbsp;✦&nbsp; Winter Sale 30% Off &nbsp;✦&nbsp; Free Shipping &nbsp;✦&nbsp; Limited Edition Drops &nbsp;✦
            </span>
          ))}
        </div>
      </div>

      {/* ===== SIGNATURE DROPS / COLLECTIONS ===== */}
      <section id="collections" className="py-24 bg-cream">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-black uppercase text-center tracking-tight mb-4">
            Explore Our Signature Drops
          </h2>
          <p className="text-center text-gray-500 mb-14 max-w-lg mx-auto">
            Curated collections that define the culture. Each drop tells a story.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {collections.map((col, i) => (
              <div key={i} className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-cream-dark to-warm/10 aspect-[3/4] cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300">
                <img
                  src={col.image}
                  alt={col.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
                {i === collections.length - 1 && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-accent rounded-full flex items-center justify-center shadow-lg animate-pulse-glow">
                    <span className="text-white text-xs font-bold uppercase tracking-wider">Explore</span>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-heading text-sm font-bold uppercase text-white tracking-wider">
                    {col.name}
                  </h3>
                  <p className="text-warm-light text-xs mt-1">{col.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FIND YOUR CATEGORY / SHOP ===== */}
      <section id="shop" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-black uppercase text-center tracking-tight mb-4">
            Find Your Category
          </h2>
          <p className="text-center text-gray-500 mb-10 max-w-lg mx-auto">
            Browse by style. Find what speaks to you.
          </p>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] border-2 transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-dark text-white border-dark shadow-lg"
                    : "border-warm/30 text-gray-600 hover:border-dark hover:text-dark"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHO IS SIMONE ===== */}
      <section className="bg-gradient-to-r from-dark via-charcoal to-dark py-20">
        <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-warm/30 to-accent/20 overflow-hidden shrink-0 ring-4 ring-warm/20 shadow-2xl">
            <img
              src="/images/owner.svg"
              alt="Simone — Founder"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="font-heading text-3xl md:text-4xl font-black uppercase text-white tracking-tight">
              Who is <span className="text-accent">Simone</span>?
            </h2>
            <p className="text-warm/80 mt-4 max-w-xl leading-relaxed text-lg">
              Simone is more than a brand — it&apos;s a reflection of its founder. Built from a passion for self-expression and a belief that what you wear should speak before you do. Every design is personal, every piece intentional.
            </p>
            <p className="text-warm/60 mt-3 max-w-xl leading-relaxed">
              From late-night sketches to a full collection, Simone was born out of the desire to create something real — clothing that carries culture, confidence, and craft in every stitch.
            </p>
            <div className="flex gap-8 mt-8">
              <div className="text-center">
                <span className="font-heading text-3xl font-black text-white">100%</span>
                <p className="text-warm/60 text-xs uppercase tracking-wider mt-1">Premium Cotton</p>
              </div>
              <div className="text-center">
                <span className="font-heading text-3xl font-black text-white">24/7</span>
                <p className="text-warm/60 text-xs uppercase tracking-wider mt-1">Customer Support</p>
              </div>
              <div className="text-center">
                <span className="font-heading text-3xl font-black text-white">30 Day</span>
                <p className="text-warm/60 text-xs uppercase tracking-wider mt-1">Free Returns</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIAL ===== */}
      <section className="py-24 bg-cream">
        <div className="mx-auto max-w-7xl px-4">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-accent to-accent-light rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 mb-8 shadow-xl"
            >
              <div className="flex-1 text-white">
                <h3 className="font-heading text-2xl md:text-3xl font-black uppercase leading-tight mb-4">
                  See why people can&apos;t stop talking about us.
                </h3>
                <div className="text-yellow-300 text-xl mb-4 drop-shadow">★★★★★</div>
                <p className="text-white/90 text-lg leading-relaxed mb-6 border-l-2 border-white/30 pl-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-white/60 text-sm">{t.location}</p>
                  </div>
                </div>
              </div>
              <div className="w-64 h-80 bg-white rounded-xl overflow-hidden shrink-0 shadow-lg ring-4 ring-white/20">
                <img
                  src="/images/placeholder.svg"
                  alt="Customer"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-heading text-3xl font-black uppercase tracking-tight">
              Subscribe to Our<br />
              <span className="text-accent">Newsletter</span>
            </h2>
            <p className="text-gray-500 mt-2">
              Exclusive releases. First access. Simone in your inbox.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full md:w-auto shadow-lg rounded-full overflow-hidden"
          >
            <input
              type="email"
              placeholder="Enter Your Email"
              className="flex-1 md:w-72 bg-cream border-2 border-warm/20 border-r-0 rounded-l-full px-6 py-3.5 text-sm outline-none focus:border-accent transition-colors"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-dark to-charcoal text-white px-8 py-3.5 text-sm font-bold uppercase tracking-[0.15em] hover:from-accent hover:to-accent-light transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gradient-to-b from-dark to-black text-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="flex flex-wrap justify-center gap-8 text-xs uppercase tracking-[0.2em] mb-10">
            <a href="#" className="hover:text-warm transition-colors">Home</a>
            <a href="#" className="hover:text-warm transition-colors">New Arrival</a>
            <a href="#" className="text-accent font-bold">Sale</a>
            <a href="#shop" className="hover:text-warm transition-colors">Shop</a>
            <a href="#collections" className="hover:text-warm transition-colors">Collections</a>
            <a href="#blog" className="hover:text-warm transition-colors">Blog</a>
          </div>
          <div className="text-center">
            <span className="font-heading text-7xl md:text-9xl font-black uppercase tracking-tighter text-shimmer opacity-30">
              SIMONE
            </span>
          </div>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-warm/20 to-transparent mt-6 mb-4" />
          <p className="text-center text-gray-600 text-xs tracking-wider">
            &copy; {new Date().getFullYear()} Simone Clothing. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
