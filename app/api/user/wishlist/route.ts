import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Wishlist from '@/models/Wishlist'

export const dynamic = 'force-dynamic'

// GET - Fetch user's wishlist
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()
    
    const wishlist = await Wishlist.findOne({ userEmail: session.user.email })
    
    if (!wishlist) {
      return NextResponse.json({ items: [] })
    }

    return NextResponse.json({
      items: wishlist.items
    })
  } catch (error) {
    console.error('Error fetching wishlist:', error)
    return NextResponse.json({ error: 'Failed to fetch wishlist' }, { status: 500 })
  }
}

// POST - Add item to wishlist
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { productId, name, price, image, category } = body

    if (!productId || !name || !price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await dbConnect()
    
    let wishlist = await Wishlist.findOne({ userEmail: session.user.email })
    
    if (!wishlist) {
      wishlist = new Wishlist({
        userEmail: session.user.email,
        items: []
      })
    }

    // Check if item already exists in wishlist
    const existingItem = wishlist.items.find(item => item.productId === productId)
    
    if (existingItem) {
      return NextResponse.json({ 
        error: 'Item already in wishlist',
        wishlist: {
          items: wishlist.items
        }
      }, { status: 400 })
    }

    // Add new item
    wishlist.items.push({
      productId,
      name,
      price,
      image,
      category,
      addedAt: new Date()
    })
    
    await wishlist.save()

    return NextResponse.json({
      message: 'Item added to wishlist',
      wishlist: {
        items: wishlist.items
      }
    })
  } catch (error) {
    console.error('Error adding item to wishlist:', error)
    return NextResponse.json({ error: 'Failed to add item to wishlist' }, { status: 500 })
  }
}

// DELETE - Remove item from wishlist
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
    }

    await dbConnect()
    
    const wishlist = await Wishlist.findOne({ userEmail: session.user.email })
    
    if (!wishlist) {
      return NextResponse.json({ error: 'Wishlist not found' }, { status: 404 })
    }

    wishlist.items = wishlist.items.filter(item => item.productId !== productId)
    await wishlist.save()

    return NextResponse.json({
      message: 'Item removed from wishlist',
      wishlist: {
        items: wishlist.items
      }
    })
  } catch (error) {
    console.error('Error removing item from wishlist:', error)
    return NextResponse.json({ error: 'Failed to remove item from wishlist' }, { status: 500 })
  }
} 