// ✅ app/api/create-order/route.js
import Razorpay from "razorpay";

export async function POST(req) {
  try {
    const body = await req.json();
    const { amount } = body;

    if (!amount || amount <= 0) {
      return Response.json({ error: "Invalid amount" }, { status: 400 });
    }

    // ✅ Check for environment variables
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      console.error("❌ Razorpay keys missing in environment variables");
      return Response.json(
        { error: "Server misconfigured: missing Razorpay keys" },
        { status: 500 }
      );
    }

    // ✅ Initialize Razorpay instance
    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    // ✅ Create the order
    const order = await razorpay.orders.create({
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    console.log("✅ Order created:", order.id);
    return Response.json(order);
  } catch (error) {
    console.error("❌ Error creating Razorpay order:", error);
    return Response.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
