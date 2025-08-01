import mongoose, { Schema, Document } from 'mongoose'

export interface IOrderItem {
  productId: string
  name: string
  price: number
  image: string
  quantity: number
  customization: { [key: string]: string }
}

export interface IPaymentDetails {
  method: 'UPI' | 'BANK_TRANSFER' | 'CARD' | 'CASH'
  upiId?: string
  bankDetails?: {
    bankName: string
    accountNumber: string
    ifscCode: string
    accountHolder: string
  }
  transactionId?: string
  amount: number
  screenshot?: string
  status: 'pending' | 'verified' | 'rejected'
  verifiedBy?: string
  verifiedAt?: Date
  notes?: string
}

export interface IOrder extends Document {
  orderId: string
  userEmail: string
  userName: string
  userPhone?: string
  items: IOrderItem[]
  subtotal: number
  shipping: number
  total: number
  paymentDetails: IPaymentDetails
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress?: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const OrderItemSchema = new Schema<IOrderItem>({
  productId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  customization: {
    type: Schema.Types.Mixed,
    default: {}
  }
})

const PaymentDetailsSchema = new Schema<IPaymentDetails>({
  method: {
    type: String,
    enum: ['UPI', 'BANK_TRANSFER', 'CARD', 'CASH'],
    required: true
  },
  upiId: {
    type: String
  },
  bankDetails: {
    bankName: {
      type: String
    },
    accountNumber: {
      type: String
    },
    ifscCode: {
      type: String
    },
    accountHolder: {
      type: String
    }
  },
  transactionId: {
    type: String
  },
  amount: {
    type: Number,
    required: true
  },
  screenshot: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  verifiedBy: {
    type: String
  },
  verifiedAt: {
    type: Date
  },
  notes: {
    type: String
  }
})

const ShippingAddressSchema = new Schema({
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true,
    default: 'India'
  }
})

const OrderSchema = new Schema<IOrder>({
  orderId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  userEmail: {
    type: String,
    required: true,
    index: true
  },
  userName: {
    type: String,
    required: true
  },
  userPhone: {
    type: String
  },
  items: {
    type: [OrderItemSchema],
    required: true
  },
  subtotal: {
    type: Number,
    required: true
  },
  shipping: {
    type: Number,
    required: true,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  paymentDetails: {
    type: PaymentDetailsSchema,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  shippingAddress: {
    type: ShippingAddressSchema
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
})



// Indexes for better query performance
OrderSchema.index({ status: 1 })
OrderSchema.index({ 'paymentDetails.status': 1 })

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema)
