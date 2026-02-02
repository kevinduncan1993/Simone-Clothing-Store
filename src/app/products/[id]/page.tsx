import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import type { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";

type Props = { params: Promise<{ id: string }> };

async function getProduct(id: string) {
  const [product] = await db.select().from(products).where(eq(products.id, id));
  return product ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description || `Shop ${product.name} at Simone Clothing`,
    openGraph: {
      title: product.name,
      description: product.description || `Shop ${product.name} at Simone Clothing`,
      images: [{ url: product.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description || `Shop ${product.name} at Simone Clothing`,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} />
    </>
  );
}
