import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { requireAdminAuth } from "@/lib/auth";

export async function GET() {
  const authError = await requireAdminAuth();
  if (authError) return authError;
  try {
    const allOrders = await db.select().from(orders).orderBy(desc(orders.createdAt));
    return NextResponse.json(allOrders);
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json([], { status: 500 });
  }
}
