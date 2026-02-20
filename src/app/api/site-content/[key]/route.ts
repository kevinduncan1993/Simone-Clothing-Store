import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { siteContent } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireAdminAuth } from "@/lib/auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params;
    const [row] = await db.select().from(siteContent).where(eq(siteContent.key, key));
    if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(row);
  } catch (error) {
    console.error("Failed to fetch site content:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const authError = await requireAdminAuth();
  if (authError) return authError;
  try {
    const { key } = await params;
    const body = await req.json();
    const [updated] = await db
      .update(siteContent)
      .set({
        heading: body.heading,
        body1: body.body1,
        body2: body.body2,
        image: body.image,
        updatedAt: new Date(),
      })
      .where(eq(siteContent.key, key))
      .returning();

    if (!updated) {
      // Insert if doesn't exist
      const [created] = await db
        .insert(siteContent)
        .values({
          key,
          heading: body.heading,
          body1: body.body1,
          body2: body.body2,
          image: body.image,
        })
        .returning();
      return NextResponse.json(created);
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update site content:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
