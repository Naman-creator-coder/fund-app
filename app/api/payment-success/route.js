import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Donation from "@/models/Donation";

export async function POST(req) {
  try {
    const body = await req.json();
    await connectDB();

    const donation = await Donation.create({
      name: body.name,
      message: body.message,
      amount: Number(body.amount),
      paymentId: body.razorpay_payment_id,
      orderId: body.razorpay_order_id,
      signature: body.razorpay_signature,
    });

    return NextResponse.json({ success: true, donation });
  } catch (error) {
    console.error("Payment save error:", error);
    return NextResponse.json({ success: false, message: "Error saving payment" }, { status: 500 });
  }
}
