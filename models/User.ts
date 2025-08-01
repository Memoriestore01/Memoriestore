import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { 
      type: String, 
      required: true, 
      unique: true,
      validate: {
        validator: function(v: string) {
          // Allow temporary mobile numbers for Google OAuth users
          if (v.startsWith('temp_')) {
            return true
          }
          // Regular mobile validation for normal users
          return /^\d{10}$/.test(v)
        },
        message: 'Mobile number must be exactly 10 digits (or temporary for OAuth users)'
      }
    },
    password: { type: String, required: false }, // Optional for Google OAuth users
    image: { type: String },
    emailVerified: { type: Boolean, default: false },
    mobileVerified: { type: Boolean, default: false },
    provider: { type: String, enum: ['credentials', 'google'], default: 'credentials' },
    googleId: { type: String, unique: true, sparse: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.models.User || mongoose.model("User", UserSchema)