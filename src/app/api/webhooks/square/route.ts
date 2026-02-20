import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { createHmac } from "crypto";

// Required env var: SQUARE_WEBHOOK_SIGNATURE_KEY
// Get it from: Square Developer Dashboard → Webhooks → your webhook endpoint → Signature key

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();

    // Verify Square webhook signature
    const signatureKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
    if (!signatureKey) {
      console.error("SQUARE_WEBHOOK_SIGNATURE_KEY is not set");
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const webhookUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/square`;
    const signature = req.headers.get("x-square-hmacsha256-signature");

    const hmac = createHmac("sha256", signatureKey);
    hmac.update(webhookUrl + rawBody);
    const expectedSignature = hmac.digest("base64");

    if (!signature || signature !== expectedSignature) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = JSON.parse(rawBody);
    const eventType = body.type;

    if (eventType === "payment.completed" || eventType === "payment.updated") {
      const payment = body.data?.object?.payment;
      if (payment?.status === "COMPLETED" && payment?.orderId) {
        const squareOrderId = payment.orderId;
        await db
          .update(orders)
          .set({
            status: "completed",
            squarePaymentId: payment.id,
          })
          .where(eq(orders.squarePaymentId, squareOrderId));
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
