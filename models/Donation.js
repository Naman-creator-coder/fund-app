import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema({
  name: String,
  message: String,
  amount: Number,
  paymentId: String,
  orderId: String,
  signature: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Donation || mongoose.model("Donation", DonationSchema);
