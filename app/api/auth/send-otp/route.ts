import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import { Otp } from "@/models/Otp"
import User from "@/models/User"
import { sendEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const { email, purpose = "register" } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    // Check if user already exists for registration
    if (purpose === "register") {
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return NextResponse.json(
          { error: "User already exists with this email" },
          { status: 400 }
        )
      }
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    
    // Set expiration time (10 minutes from now)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

    // Delete any existing OTP for this email and purpose
    await Otp.deleteMany({ email, purpose })

    // Save new OTP
    const newOtp = new Otp({
      email,
      otp,
      purpose,
      expiresAt,
    })
    await newOtp.save()

    // Send email
    const emailSent = await sendEmail({
      to: email,
      subject: "Your OTP for Memoriestore",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Your OTP for Memoriestore</h2>
          <p>Your OTP is: <strong style="font-size: 24px; color: #007bff;">${otp}</strong></p>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you didn't request this OTP, please ignore this email.</p>
        </div>
      `,
    })

    if (!emailSent) {
      return NextResponse.json(
        { error: "Failed to send OTP email" },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: "OTP sent successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Send OTP error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}