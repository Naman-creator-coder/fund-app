import connectDB from "@/lib/mongodb";
import Donation from "@/models/Donation";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const donations = await Donation.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, donations });
  } catch (error) {
    console.error("Error fetching donations:", error);
    return NextResponse.json({ success: false, message: "Error fetching donations" }, { status: 500 });
  }
}
