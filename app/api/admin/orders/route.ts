import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Order from '@/models/Order'
import User from '@/models/User'

export const dynamic = 'force-dynamic'

// GET - Get all orders for admin
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is admin
    await dbConnect()
    const user = await User.findOne({ email: session.user.email })
    
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const paymentStatus = searchParams.get('paymentStatus')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    const query: any = {}
    if (status) {
      query.status = status
    }
    if (paymentStatus) {
      query['paymentDetails.status'] = paymentStatus
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    const total = await Order.countDocuments(query)

    // Get counts for different statuses
    const pendingCount = await Order.countDocuments({ status: 'pending' })
    const confirmedCount = await Order.countDocuments({ status: 'confirmed' })
    const processingCount = await Order.countDocuments({ status: 'processing' })
    const shippedCount = await Order.countDocuments({ status: 'shipped' })
    const deliveredCount = await Order.countDocuments({ status: 'delivered' })
    const cancelledCount = await Order.countDocuments({ status: 'cancelled' })
    const pendingPaymentCount = await Order.countDocuments({ 'paymentDetails.status': 'pending' })

    return NextResponse.json({
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      stats: {
        pending: pendingCount,
        confirmed: confirmedCount,
        processing: processingCount,
        shipped: shippedCount,
        delivered: deliveredCount,
        cancelled: cancelledCount,
        pendingPayment: pendingPaymentCount
      }
    })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

// PUT - Update order status or payment verification
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is admin
    await dbConnect()
    const user = await User.findOne({ email: session.user.email })
    
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const body = await request.json()
    const { orderId, action, status, paymentStatus, notes } = body

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID required' }, { status: 400 })
    }

    const order = await Order.findOne({ orderId })
    
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    const updateData: any = {}

    if (action === 'updateStatus' && status) {
      updateData.status = status
    }

    if (action === 'verifyPayment') {
      updateData['paymentDetails.status'] = paymentStatus || 'verified'
      updateData['paymentDetails.verifiedBy'] = session.user.email
      updateData['paymentDetails.verifiedAt'] = new Date()
      if (notes) {
        updateData['paymentDetails.notes'] = notes
      }
    }

    if (action === 'addNotes' && notes) {
      updateData.notes = notes
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { orderId },
      updateData,
      { new: true }
    )

    return NextResponse.json({
      message: 'Order updated successfully',
      order: updatedOrder
    })
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}