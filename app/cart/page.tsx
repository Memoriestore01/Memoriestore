"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ShoppingCart, 
  ArrowLeft, 
  Plus, 
  Minus, 
  Trash2,
  CreditCard,
  Package
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function CartPage() {
  const { items: cartItems = [], removeItem, updateQuantity, clearCart, mounted } = useCart()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [clientMounted, setClientMounted] = useState(false)

  useEffect(() => {
    setClientMounted(true)
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price)
  }

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      await removeItem(productId)
      toast.success("Item removed from cart")
    } else {
      await updateQuantity(productId, newQuantity)
    }
  }

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please sign in to checkout")
      return
    }
    
    if (cartItems.length === 0) {
      toast.error("Your cart is empty")
      return
    }

    setLoading(true)
    try {
      // Redirect to checkout page
      window.location.href = "/checkout"
    } catch (error) {
      console.error("Checkout error:", error)
      toast.error("Failed to proceed to checkout")
    } finally {
      setLoading(false)
    }
  }

  // Prevent hydration issues by not calculating totals until mounted
  const subtotal = clientMounted && cartItems ? cartItems.reduce((total, item) => total + (item.price * item.quantity), 0) : 0
  const shipping = subtotal > 0 ? 50 : 0
  const total = subtotal + shipping

  // Show loading state during hydration
  if (!clientMounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="text-center py-8 sm:py-12">
            <div className="animate-pulse">
              <div className="h-12 w-12 sm:h-16 sm:w-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <div className="h-6 sm:h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="text-center py-8 sm:py-12">
            <ShoppingCart className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Add some products to your cart to get started.</p>
            <Link href="/categories">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-center mb-4 sm:mb-6">
          <Link href="/categories">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Continue Shopping</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 sm:p-6 border-b">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Shopping Cart</h1>
                <p className="text-sm sm:text-base text-gray-600">{cartItems.length} items</p>
              </div>
              
              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.productId} className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600">{formatPrice(item.price)}</p>
                      </div>
                      
                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          
                          <span className="w-8 sm:w-12 text-center font-medium text-sm sm:text-base">
                            {item.quantity}
                          </span>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-base sm:text-lg font-semibold text-gray-900">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              removeItem(item.productId)
                              toast.success("Item removed from cart")
                            }}
                            className="text-red-600 hover:text-red-700 p-1 sm:p-2"
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Shipping</span>
                  <span>{formatPrice(shipping)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold text-base sm:text-lg">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                
                <div className="space-y-3 pt-4">
                  <Button 
                    onClick={handleCheckout} 
                    disabled={loading || !user}
                    className="w-full"
                    size="lg"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    {loading ? "Processing..." : "Proceed to Checkout"}
                  </Button>
                  
                  {!user && (
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">Please sign in to checkout</p>
                      <Link href="/login">
                        <Button variant="outline" size="sm" className="w-full">
                          Sign In
                        </Button>
                      </Link>
                    </div>
                  )}
                  
                  <Button 
                    variant="outline" 
                    onClick={clearCart}
                    className="w-full"
                    size="sm"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
