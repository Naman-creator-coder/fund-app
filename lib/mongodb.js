import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/fundApp";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};

export default connectDB;
