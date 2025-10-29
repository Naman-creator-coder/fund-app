import connectDB from "@/lib/mongodb";
import Donation from "@/models/Donation";

export async function GET() {
  try {
    await connectDB();
    const donations = await Donation.find({});
    return Response.json(donations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    return Response.json({ error: "Failed to fetch donations" }, { status: 500 });
  }
}
