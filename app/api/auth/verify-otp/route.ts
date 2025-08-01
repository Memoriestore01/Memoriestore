import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import { Otp } from "@/models/Otp"

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const { email, otp, purpose = "register" } = await request.json()

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      )
    }

    // Find the OTP record
    const otpRecord = await Otp.findOne({
      email,
      otp,
      purpose,
      expiresAt: { $gt: new Date() },
      verified: false,
    })

    if (!otpRecord) {
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 400 }
      )
    }

    // Mark OTP as verified
    await Otp.findByIdAndUpdate(otpRecord._id, { verified: true })

    return NextResponse.json(
      { message: "OTP verified successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Verify OTP error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}