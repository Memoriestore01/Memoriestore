import mongoose, { Schema, Document } from 'mongoose'

export interface IWishlistItem {
  productId: string
  name: string
  price: number
  image: string
  category: string
  addedAt: Date
}

export interface IWishlist extends Document {
  userEmail: string
  items: IWishlistItem[]
  createdAt: Date
  updatedAt: Date
}

const WishlistItemSchema = new Schema<IWishlistItem>({
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
  category: {
    type: String,
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
})

const WishlistSchema = new Schema<IWishlist>({
  userEmail: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  items: {
    type: [WishlistItemSchema],
    default: []
  }
}, {
  timestamps: true
})

// Index for better query performance
WishlistSchema.index({ userEmail: 1 })

export default mongoose.models.Wishlist || mongoose.model<IWishlist>('Wishlist', WishlistSchema) 