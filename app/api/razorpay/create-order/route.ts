import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const ALLOWED_AMOUNTS = [149900, 199900]; // ₹1499, ₹1999

export async function POST(req: Request) {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return NextResponse.json({ error: "Payment not configured" }, { status: 503 });
  }

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  try {
    const body = await req.json().catch(() => ({})) as { amount?: number };
    const amount = ALLOWED_AMOUNTS.includes(body.amount ?? 0) ? body.amount! : 199900;

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `vault_${Date.now()}`,
    });

    return NextResponse.json({ orderId: order.id, amount: order.amount });
  } catch (err) {
    console.error("Razorpay order creation failed:", err);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
