import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import { Otp } from "@/models/Otp"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const { name, email, mobile, password, otp } = await request.json()

    // Validate required fields
    if (!name || !email || !mobile || !password || !otp) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // Validate mobile number (exactly 10 digits)
    if (!/^\d{10}$/.test(mobile)) {
      return NextResponse.json(
        { error: "Mobile number must be exactly 10 digits" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { mobile }]
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists with this email or mobile number" },
        { status: 400 }
      )
    }

    // Verify OTP
    const otpRecord = await Otp.findOne({
      email,
      otp,
      purpose: "register",
      verified: true,
      expiresAt: { $gt: new Date() },
    })

    if (!otpRecord) {
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create new user
    const newUser = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
      emailVerified: true,
      provider: 'credentials',
    })

    await newUser.save()

    // Delete the used OTP
    await Otp.findByIdAndDelete(otpRecord._id)

    return NextResponse.json(
      { 
        message: "User registered successfully",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          mobile: newUser.mobile,
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}