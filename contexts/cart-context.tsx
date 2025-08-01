"use client"

import { createContext, useContext, useReducer, useEffect, useState, type ReactNode } from "react"
import { useAuth } from "./auth-context"
import { toast } from "sonner"

interface CartItem {
  productId: string
  name: string
  price: number
  image: string
  quantity: number
  customization: { [key: string]: string }
  addedAt: Date
}

interface CartState {
  items: CartItem[]
  total: number
  loading: boolean
}

type CartAction =
  | { type: "SET_ITEMS"; payload: CartItem[] }
  | { type: "SET_TOTAL"; payload: number }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "CLEAR_CART" }

const CartContext = createContext<{
  state: CartState
  addItem: (item: Omit<CartItem, 'addedAt'>) => Promise<void>
  removeItem: (productId: string) => Promise<void>
  updateQuantity: (productId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  items: CartItem[]
  total: number
  loading: boolean
  mounted: boolean
} | null>(null)

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "SET_ITEMS":
      return { ...state, items: action.payload }
    case "SET_TOTAL":
      return { ...state, total: action.payload }
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "CLEAR_CART":
      return { ...state, items: [], total: 0 }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [state, dispatch] = useReducer(cartReducer, { 
    items: [], 
    total: 0, 
    loading: false 
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Load cart from backend when user changes
  useEffect(() => {
    if (mounted && user) {
      loadCart()
    } else if (mounted && !user) {
      // Clear cart when user logs out
      dispatch({ type: "CLEAR_CART" })
    }
  }, [user, mounted])

  const loadCart = async () => {
    if (!user) return

    try {
      dispatch({ type: "SET_LOADING", payload: true })
      const response = await fetch('/api/user/cart')
      
      if (response.ok) {
        const data = await response.json()
        dispatch({ type: "SET_ITEMS", payload: data.items || [] })
        dispatch({ type: "SET_TOTAL", payload: data.total || 0 })
      } else {
        console.error('Failed to load cart')
        toast.error('Failed to load cart')
      }
    } catch (error) {
      console.error('Error loading cart:', error)
      toast.error('Error loading cart')
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const addItem = async (item: Omit<CartItem, 'addedAt'>) => {
    if (!user) {
      toast.error('Please login to add items to cart')
      return
    }

    try {
      dispatch({ type: "SET_LOADING", payload: true })
      const response = await fetch('/api/user/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      })

      if (response.ok) {
        const data = await response.json()
        dispatch({ type: "SET_ITEMS", payload: data.cart.items })
        dispatch({ type: "SET_TOTAL", payload: data.cart.total })
        toast.success(`${item.name} added to cart`)
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to add item to cart')
      }
    } catch (error) {
      console.error('Error adding item to cart:', error)
      toast.error('Error adding item to cart')
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const removeItem = async (productId: string) => {
    if (!user) return

    try {
      dispatch({ type: "SET_LOADING", payload: true })
      const response = await fetch(`/api/user/cart?productId=${productId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        const data = await response.json()
        dispatch({ type: "SET_ITEMS", payload: data.cart.items })
        dispatch({ type: "SET_TOTAL", payload: data.cart.total })
        toast.success('Item removed from cart')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to remove item from cart')
      }
    } catch (error) {
      console.error('Error removing item from cart:', error)
      toast.error('Error removing item from cart')
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!user) return

    try {
      dispatch({ type: "SET_LOADING", payload: true })
      const response = await fetch('/api/user/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }),
      })

      if (response.ok) {
        const data = await response.json()
        dispatch({ type: "SET_ITEMS", payload: data.cart.items })
        dispatch({ type: "SET_TOTAL", payload: data.cart.total })
        if (quantity === 0) {
          toast.success('Item removed from cart')
        } else {
          toast.success('Cart updated')
        }
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to update cart')
      }
    } catch (error) {
      console.error('Error updating cart:', error)
      toast.error('Error updating cart')
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const clearCart = async () => {
    if (!user) return

    try {
      dispatch({ type: "SET_LOADING", payload: true })
      // Clear cart by setting items to empty array
      const response = await fetch('/api/user/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clearAll: true }),
      })

      if (response.ok) {
        dispatch({ type: "CLEAR_CART" })
        toast.success('Cart cleared')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to clear cart')
      }
    } catch (error) {
      console.error('Error clearing cart:', error)
      toast.error('Error clearing cart')
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        items: state.items,
        total: state.total,
        loading: state.loading,
        mounted,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
