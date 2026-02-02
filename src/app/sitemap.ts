import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://simoneclothing.com";

  const allProducts = await db.select({ id: products.id, updatedAt: products.updatedAt }).from(products);

  const productEntries: MetadataRoute.Sitemap = allProducts.map((p) => ({
    url: `${baseUrl}/products/${p.id}`,
    lastModified: p.updatedAt,
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    ...productEntries,
  ];
}
