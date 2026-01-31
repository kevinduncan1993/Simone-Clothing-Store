import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const eventType = body.type;

    if (eventType === "payment.completed" || eventType === "payment.updated") {
      const payment = body.data?.object?.payment;
      if (payment?.status === "COMPLETED" && payment?.orderId) {
        // Try to find and update the order by square payment ID
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
