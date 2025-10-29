import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String },
  amount: { type: Number, required: true },
  email: { type: String },
  time: { type: Date, default: Date.now },
});

export default mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
