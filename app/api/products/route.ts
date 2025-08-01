import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Product from "@/models/Product"

export async function GET(request: NextRequest) {
  try {
    console.log('Products API called')
    
    // Connect to database
    await dbConnect()
    console.log('Database connected successfully')
    
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')
    const search = searchParams.get('search')
    
    console.log('Query params:', { category, featured, limit, search })
    
    // Build query
    let query: any = { isActive: true }
    
    if (category) {
      // Case-insensitive search for category
      query.category = { $regex: new RegExp(category, 'i') }
    }
    
    if (featured === 'true') {
      query.isFeatured = true
    }
    
    // Add search functionality
    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i')
      query.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
        { tags: { $in: [searchRegex] } },
        { sku: searchRegex }
      ]
    }
    
    console.log('Final query:', JSON.stringify(query, null, 2))
    
    // Build options
    let options: any = { sort: { createdAt: -1 } }
    
    if (limit) {
      options.limit = parseInt(limit)
    }
    
    console.log('Query options:', JSON.stringify(options, null, 2))
    
    // Get products
    const products = await Product.find(query, null, options).lean()
    console.log('Found products:', products.length)
    
    // Log first product for debugging
    if (products.length > 0) {
      console.log('Sample product:', {
        id: products[0]._id,
        name: products[0].name,
        category: products[0].category,
        isActive: products[0].isActive
      })
    }
    
    return NextResponse.json({ 
      products,
      total: products.length,
      query: query,
      category: category,
      search: search
    })
  } catch (error) {
    console.error("Products fetch error:", error)
    return NextResponse.json(
      { 
        error: "Internal server error",
        message: error instanceof Error ? error.message : 'Unknown error',
        products: [],
        total: 0
      },
      { status: 500 }
    )
  }
}

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'