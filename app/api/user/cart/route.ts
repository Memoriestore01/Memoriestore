import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Cart from '@/models/Cart'

export const dynamic = 'force-dynamic'

// GET - Fetch user's cart
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()
    
    const cart = await Cart.findOne({ userEmail: session.user.email })
    
    if (!cart) {
      return NextResponse.json({ items: [], total: 0 })
    }

    return NextResponse.json({
      items: cart.items,
      total: cart.total
    })
  } catch (error) {
    console.error('Error fetching cart:', error)
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 })
  }
}

// POST - Add item to cart
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { productId, name, price, image, quantity = 1, customization = {} } = body

    if (!productId || !name || !price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await dbConnect()
    
    let cart = await Cart.findOne({ userEmail: session.user.email })
    
    if (!cart) {
      cart = new Cart({
        userEmail: session.user.email,
        items: [],
        total: 0
      })
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(item => item.productId === productId)
    
    if (existingItemIndex > -1) {
      // Update existing item quantity
      cart.items[existingItemIndex].quantity += quantity
    } else {
      // Add new item
      cart.items.push({
        productId,
        name,
        price,
        image,
        quantity,
        customization,
        addedAt: new Date()
      })
    }

    // Recalculate total
    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    
    await cart.save()

    return NextResponse.json({
      message: 'Item added to cart',
      cart: {
        items: cart.items,
        total: cart.total
      }
    })
  } catch (error) {
    console.error('Error adding item to cart:', error)
    return NextResponse.json({ error: 'Failed to add item to cart' }, { status: 500 })
  }
}

// PUT - Update cart item quantity
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { productId, quantity, clearAll } = body

    if (clearAll) {
      // Clear all items from cart
      cart.items = []
      cart.total = 0
      await cart.save()
      
      return NextResponse.json({
        message: 'Cart cleared',
        cart: {
          items: cart.items,
          total: cart.total
        }
      })
    }

    if (!productId || quantity === undefined) {
      console.error('Missing required fields:', { productId, quantity })
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await dbConnect()
    
    const cart = await Cart.findOne({ userEmail: session.user.email })
    
    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 })
    }

    const itemIndex = cart.items.findIndex(item => item.productId === productId)
    
    if (itemIndex === -1) {
      return NextResponse.json({ error: 'Item not found in cart' }, { status: 404 })
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      cart.items.splice(itemIndex, 1)
    } else {
      // Update quantity
      cart.items[itemIndex].quantity = quantity
    }

    // Recalculate total
    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    
    await cart.save()

    return NextResponse.json({
      message: 'Cart updated',
      cart: {
        items: cart.items,
        total: cart.total
      }
    })
  } catch (error) {
    console.error('Error updating cart:', error)
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 })
  }
}

// DELETE - Remove item from cart
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')

    if (!productId) {
      console.error('Product ID is required')
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
    }

    await dbConnect()
    
    const cart = await Cart.findOne({ userEmail: session.user.email })
    
    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 })
    }

    cart.items = cart.items.filter(item => item.productId !== productId)
    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    
    await cart.save()

    return NextResponse.json({
      message: 'Item removed from cart',
      cart: {
        items: cart.items,
        total: cart.total
      }
    })
  } catch (error) {
    console.error('Error removing item from cart:', error)
    return NextResponse.json({ error: 'Failed to remove item from cart' }, { status: 500 })
  }
} 