"use client"

import React, { createContext, useContext, useReducer, useEffect, useState } from 'react'
import { useAuth } from './auth-context'
import { toast } from 'sonner'

interface WishlistItem {
  productId: string
  name: string
  price: number
  image: string
  category: string
  addedAt: Date
}

interface WishlistState {
  items: WishlistItem[]
  loading: boolean
}

type WishlistAction =
  | { type: 'SET_ITEMS'; payload: WishlistItem[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'CLEAR_WISHLIST' }

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload
      }
    
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      }
    
    case 'CLEAR_WISHLIST':
      return {
        ...state,
        items: []
      }
    
    default:
      return state
  }
}

interface WishlistContextType {
  wishlistItems: WishlistItem[]
  loading: boolean
  addToWishlist: (item: Omit<WishlistItem, 'addedAt'>) => Promise<void>
  removeFromWishlist: (productId: string) => Promise<void>
  clearWishlist: () => Promise<void>
  isInWishlist: (productId: string) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [state, dispatch] = useReducer(wishlistReducer, {
    items: [],
    loading: false
  })

  // Set mounted state to prevent hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  // Load wishlist from backend when user changes
  useEffect(() => {
    if (mounted && user) {
      loadWishlist()
    } else if (mounted && !user) {
      // Clear wishlist when user logs out
      dispatch({ type: 'CLEAR_WISHLIST' })
    }
  }, [user, mounted])

  const loadWishlist = async () => {
    if (!user) return

    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await fetch('/api/user/wishlist')
      
      if (response.ok) {
        const data = await response.json()
        // Convert string dates back to Date objects
        const parsedItems = data.items.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        }))
        dispatch({ type: 'SET_ITEMS', payload: parsedItems })
      } else {
        console.error('Failed to load wishlist')
        toast.error('Failed to load wishlist')
      }
    } catch (error) {
      console.error('Error loading wishlist:', error)
      toast.error('Error loading wishlist')
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const addToWishlist = async (item: Omit<WishlistItem, 'addedAt'>) => {
    if (!user) {
      toast.error('Please login to add items to wishlist')
      return
    }

    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await fetch('/api/user/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      })

      if (response.ok) {
        const data = await response.json()
        // Convert string dates back to Date objects
        const parsedItems = data.wishlist.items.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        }))
        dispatch({ type: 'SET_ITEMS', payload: parsedItems })
        toast.success(`${item.name} added to wishlist`)
      } else {
        const error = await response.json()
        if (error.error === 'Item already in wishlist') {
          toast.info('Item is already in your wishlist')
        } else {
          toast.error(error.error || 'Failed to add item to wishlist')
        }
      }
    } catch (error) {
      console.error('Error adding item to wishlist:', error)
      toast.error('Error adding item to wishlist')
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const removeFromWishlist = async (productId: string) => {
    if (!user) return

    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await fetch(`/api/user/wishlist?productId=${productId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        const data = await response.json()
        // Convert string dates back to Date objects
        const parsedItems = data.wishlist.items.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        }))
        dispatch({ type: 'SET_ITEMS', payload: parsedItems })
        toast.success('Item removed from wishlist')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to remove item from wishlist')
      }
    } catch (error) {
      console.error('Error removing item from wishlist:', error)
      toast.error('Error removing item from wishlist')
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const clearWishlist = async () => {
    if (!user) return

    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      // Remove all items one by one (or implement a clear all endpoint)
      for (const item of state.items) {
        await removeFromWishlist(item.productId)
      }
      dispatch({ type: 'CLEAR_WISHLIST' })
      toast.success('Wishlist cleared')
    } catch (error) {
      console.error('Error clearing wishlist:', error)
      toast.error('Error clearing wishlist')
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const isInWishlist = (productId: string) => {
    return state.items.some(item => item.productId === productId)
  }

  const value: WishlistContextType = {
    wishlistItems: state.items,
    loading: state.loading,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}