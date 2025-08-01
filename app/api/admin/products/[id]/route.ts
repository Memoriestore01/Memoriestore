import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import Product from "@/models/Product"
import { deleteImages } from "@/lib/cloudinary"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Check if SKU already exists for another product
    const existingProduct = await Product.findOne({ 
      sku: productData.sku,
      _id: { $ne: params.id }
    })
    if (existingProduct) {
      return NextResponse.json(
        { error: "SKU already exists" },
        { status: 400 }
      )
    }

    // Get the current product to compare images
    const currentProduct = await Product.findById(params.id)
    if (!currentProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    // Find images that were removed (images that exist in currentProduct but not in productData)
    const removedImages = currentProduct.images.filter(
      currentImage => !productData.images.includes(currentImage)
    )

    // If there are removed images, delete them from Cloudinary
    if (removedImages.length > 0) {
      try {
        // Extract public_ids from the removed image URLs
        const publicIds = removedImages.map(url => {
          // Extract public_id from Cloudinary URL
          const urlParts = url.split('/')
          const filename = urlParts[urlParts.length - 1]
          const publicId = filename.split('.')[0] // Remove file extension
          return `memoriestore/products/${publicId}`
        })
        
        await deleteImages(publicIds)
      } catch (error) {
        console.error('Error deleting images from Cloudinary:', error)
        // Continue with the update even if image deletion fails
      }
    }

    // Update product
    const product = await Product.findByIdAndUpdate(
      params.id,
      productData,
      { new: true, runValidators: true }
    )

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: "Product updated successfully",
      product
    })
  } catch (error) {
    console.error("Admin product update error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Get the product before deleting to handle image cleanup
    const product = await Product.findById(params.id)
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    // Delete images from Cloudinary if they exist
    if (product.images && product.images.length > 0) {
      try {
        const publicIds = product.images.map(url => {
          const urlParts = url.split('/')
          const filename = urlParts[urlParts.length - 1]
          const publicId = filename.split('.')[0]
          return `memoriestore/products/${publicId}`
        })
        
        await deleteImages(publicIds)
      } catch (error) {
        console.error('Error deleting images from Cloudinary:', error)
        // Continue with product deletion even if image deletion fails
      }
    }

    // Delete product
    await Product.findByIdAndDelete(params.id)

    return NextResponse.json({
      message: "Product deleted successfully"
    })
  } catch (error) {
    console.error("Admin product deletion error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}