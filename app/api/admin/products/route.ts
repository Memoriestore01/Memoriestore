import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import Product from "@/models/Product"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    await dbConnect()
    
    // Check if user is admin
    const user = await User.findOne({ email: session.user.email })
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: "Access denied. Admin only." },
        { status: 403 }
      )
    }

    // Get all products
    const products = await Product.find().sort({ createdAt: -1 })

    return NextResponse.json({ products })
  } catch (error) {
    console.error("Admin products fetch error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    await dbConnect()
    
    // Check if user is admin
    const user = await User.findOne({ email: session.user.email })
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: "Access denied. Admin only." },
        { status: 403 }
      )
    }

    const productData = await request.json()

    // Validate required fields
    if (!productData.name || !productData.description || !productData.price || !productData.category || !productData.stock || !productData.sku) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if SKU already exists
    const existingProduct = await Product.findOne({ sku: productData.sku })
    if (existingProduct) {
      return NextResponse.json(
        { error: "SKU already exists" },
        { status: 400 }
      )
    }

    // Create new product
    const product = new Product(productData)
    await product.save()

    return NextResponse.json({
      message: "Product created successfully",
      product
    })
  } catch (error) {
    console.error("Admin product creation error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}