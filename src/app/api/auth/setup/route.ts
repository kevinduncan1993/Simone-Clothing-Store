import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const existing = await db.select().from(adminUsers);
    if (existing.length > 0) {
      return NextResponse.json({ error: "Admin user already exists" }, { status: 400 });
    }

    const { email, password } = await req.json();

    if (!email || !password || password.length < 6) {
      return NextResponse.json({ error: "Valid email and password (min 6 chars) required" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await db.insert(adminUsers).values({ email, passwordHash });

    return NextResponse.json({ success: true, message: "Admin account created" });
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
