import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { requireAdminAuth } from "@/lib/auth";

export async function GET() {
  try {
    const allProducts = await db.select().from(products).orderBy(desc(products.createdAt));
    return NextResponse.json(allProducts);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = await requireAdminAuth();
  if (authError) return authError;
  try {
    const body = await req.json();
    const [product] = await db.insert(products).values({
      name: body.name,
      price: body.price,
      image: body.images?.[0] ?? body.image ?? "/images/placeholder.svg",
      images: body.images ?? [],
      description: body.description || "",
      sizes: body.sizes || ["S", "M", "L", "XL"],
      category: body.category || "Men",
      rating: body.rating || 5,
      reviews: body.reviews || "0",
    }).returning();

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Failed to create product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
