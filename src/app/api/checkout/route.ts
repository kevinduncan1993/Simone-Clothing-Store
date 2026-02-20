import { NextRequest, NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

const squareClient = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN!,
  environment: process.env.SQUARE_ENVIRONMENT === "production" ? SquareEnvironment.Production : SquareEnvironment.Sandbox,
});

export async function POST(req: NextRequest) {
  try {
    const { items, customerEmail } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const total = items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    // Create order in database
    const [order] = await db.insert(orders).values({
      items: items.map((item: any) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        size: item.size,
        quantity: item.quantity,
      })),
      total,
      status: "pending",
      customerEmail: customerEmail || null,
    }).returning();

    // Create Square checkout
    const idempotencyKey = uuidv4();
    const origin = req.headers.get("origin") || "http://localhost:3000";

    const response = await squareClient.checkout.paymentLinks.create({
      idempotencyKey,
      order: {
        locationId: process.env.SQUARE_LOCATION_ID!,
        lineItems: items.map((item: any) => ({
          name: `${item.name} (${item.size})`,
          quantity: String(item.quantity),
          basePriceMoney: {
            amount: BigInt(Math.round(item.price * 100)),
            currency: "USD",
          },
        })),
      },
      checkoutOptions: {
        redirectUrl: `${origin}/checkout/success?orderId=${order.id}`,
      },
    });

    const paymentLink = response.paymentLink;

    // Store Square's order ID so the webhook can match it later
    if (paymentLink?.orderId) {
      await db
        .update(orders)
        .set({ squarePaymentId: paymentLink.orderId })
        .where(eq(orders.id, order.id));
    }

    return NextResponse.json({
      url: paymentLink?.url,
      orderId: order.id,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 });
  }
}
