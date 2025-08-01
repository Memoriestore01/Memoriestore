import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        await dbConnect()

        const user = await User.findOne({ email: credentials.email })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        await dbConnect()
        
        const existingUser = await User.findOne({ email: user.email })
        
        if (existingUser) {
          // Update existing user with Google info
          await User.findByIdAndUpdate(existingUser._id, {
            googleId: profile?.sub,
            image: user.image,
            emailVerified: true,
            provider: 'google'
          })
          return true
        } else {
          // For Google OAuth users, we'll create a temporary mobile number
          // They can update it later in their profile
          const tempMobile = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
          
          // Create new user with Google info
          const newUser = new User({
            name: user.name,
            email: user.email,
            mobile: tempMobile, // Temporary mobile number
            image: user.image,
            googleId: profile?.sub,
            emailVerified: true,
            provider: 'google',
            password: '', // Not needed for Google users
            mobileVerified: false, // They need to verify their real mobile later
          })
          await newUser.save()
          return true
        }
      }
      return true
    }
  },
  pages: {
    signIn: '/login',
    signUp: '/signup',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
} 