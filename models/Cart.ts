import mongoose, { Schema, Document } from 'mongoose'

export interface ICartItem {
  productId: string
  name: string
  price: number
  image: string
  quantity: number
  customization: { [key: string]: string }
  addedAt: Date
}

export interface ICart extends Document {
  userEmail: string
  items: ICartItem[]
  total: number
  createdAt: Date
  updatedAt: Date
}

const CartItemSchema = new Schema<ICartItem>({
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
    default: 1,
    min: 1
  },
  customization: {
    type: Schema.Types.Mixed,
    default: {}
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
})

const CartSchema = new Schema<ICart>({
  userEmail: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  items: {
    type: [CartItemSchema],
    default: []
  },
  total: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

// Pre-save middleware to calculate total
CartSchema.pre('save', function(next) {
  this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  next()
})

// Index for better query performance - removed duplicate index

export default mongoose.models.Cart || mongoose.model<ICart>('Cart', CartSchema) 