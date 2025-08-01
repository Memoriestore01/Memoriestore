import mongoose from "mongoose"

const OtpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    otp: { type: String, required: true },
    purpose: { type: String, enum: ["register", "reset-password"], required: true },
    expiresAt: { type: Date, required: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const Otp = mongoose.models.Otp || mongoose.model("Otp", OtpSchema) 