import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ error: "Account registration is disabled" }, { status: 403 });
}
