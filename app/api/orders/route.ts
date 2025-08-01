import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Order from '@/models/Order'

export const dynamic = 'force-dynamic'

// POST - Create new order
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { items, subtotal, shipping, total, paymentDetails, shippingAddress, notes } = body

    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error('No items in order:', { items })
      return NextResponse.json({ error: 'No items in order' }, { status: 400 })
    }

    if (!paymentDetails) {
      console.error('Payment details missing:', { paymentDetails })
      return NextResponse.json({ error: 'Payment details required' }, { status: 400 })
    }

    // Validate payment details based on method
    if (paymentDetails.method === 'UPI' && !paymentDetails.transactionId) {
      console.error('UPI transaction ID missing:', { paymentDetails })
      return NextResponse.json({ error: 'Transaction ID required for UPI payment' }, { status: 400 })
    }

    if (paymentDetails.method === 'BANK_TRANSFER' && !paymentDetails.transactionId) {
      console.error('Bank transfer transaction ID missing:', { paymentDetails })
      return NextResponse.json({ error: 'Transaction ID required for bank transfer' }, { status: 400 })
    }

    await dbConnect()
    
    // Generate order ID manually
    const timestamp = Date.now().toString()
    const random = Math.random().toString(36).substr(2, 5).toUpperCase()
    const orderId = `ORD-${timestamp.slice(-6)}-${random}`
    
    console.log('Creating order with orderId:', orderId)
    
    const order = new Order({
      orderId,
      userEmail: session.user.email,
      userName: session.user.name || 'User',
      items,
      subtotal,
      shipping,
      total,
      paymentDetails: {
        ...paymentDetails,
        upiId: paymentDetails.method === 'UPI' ? 'sharmabhupender206@oksbi' : undefined,
        bankDetails: paymentDetails.method === 'BANK_TRANSFER' ? {
          bankName: 'HDFC Bank',
          accountNumber: '1234567890',
          ifscCode: 'HDFC1234567',
          accountHolder: 'Bhupender Sharma'
        } : undefined
      },
      shippingAddress,
      notes,
      status: 'pending'
    })

    await order.save()

    return NextResponse.json({
      message: 'Order created successfully',
      order: {
        orderId: order.orderId,
        total: order.total,
        status: order.status,
        paymentStatus: order.paymentDetails.status
      }
    })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}

// GET - Get user's orders
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    await dbConnect()
    
    const query: any = { userEmail: session.user.email }
    if (status) {
      query.status = status
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    const total = await Order.countDocuments(query)

    return NextResponse.json({
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
} 