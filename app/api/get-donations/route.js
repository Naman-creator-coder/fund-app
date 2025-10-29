// ✅ app/api/get-donations/route.js
import connectDB from "@/lib/mongodb";
import Donation from "@/models/Donation";

export async function GET() {
  try {
    await connectDB();
    const donations = await Donation.find({}).sort({ createdAt: -1 });

    return Response.json({ success: true, donations });
  } catch (error) {
    console.error("❌ Error fetching donations:", error);
    return Response.json(
      { success: false, error: "Failed to fetch donations" },
      { status: 500 }
    );
  }
}
