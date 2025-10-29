import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { amount } = await req.json();

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: Number(amount) * 100, // convert to paise
      currency: "INR",
      receipt: "receipt#1",
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
