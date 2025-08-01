"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Play, Star, ShoppingCart, Heart, CreditCard } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface ProductDetailsProps {
  product: {
    _id: string
    name: string
    description: string
    price: number
    originalPrice?: number
    category: string
    subcategory?: string
    images: string[]
    stock: number
    sku: string
    tags: string[]
    isActive: boolean
    isFeatured: boolean
    createdAt: string
  }
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [customization, setCustomization] = useState<{ [key: string]: string }>({})
  const [isPlaying, setIsPlaying] = useState(false)
  const { addItem } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  // Debug logging for user state
  console.log('ProductDetails rendered:', { 
    user: user ? 'Logged in' : 'Not logged in',
    productId: product._id,
    productActive: product.isActive,
    productStock: product.stock
  })

  const handleCustomizationChange = (key: string, value: string) => {
    setCustomization((prev) => ({ ...prev, [key]: value }))
  }

  const handleAddToCart = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to add items to cart.",
        variant: "destructive"
      })
      router.push('/login')
      return
    }

    if (!product.isActive) {
      toast({
        title: "Product Unavailable",
        description: "This product is currently not available.",
        variant: "destructive"
      })
      return
    }

    if (product.stock <= 0) {
      toast({
        title: "Out of Stock",
        description: "This product is currently out of stock.",
        variant: "destructive"
      })
      return
    }

    await addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images.length > 0 ? product.images[0] : "/placeholder.svg",
      customization,
      quantity: 1,
    })

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleBuyNow = () => {
    console.log('Buy Now clicked', { 
      user: user ? 'Logged in' : 'Not logged in', 
      productId: product._id,
      productName: product.name,
      productPrice: product.price,
      productActive: product.isActive,
      productStock: product.stock,
      customization 
    })
    
    if (!user) {
      console.log('User not logged in, redirecting to login')
      toast({
        title: "Login Required",
        description: "Please login to proceed with purchase.",
        variant: "destructive"
      })
      router.push('/login')
      return
    }

    if (!product.isActive) {
      console.log('Product not active')
      toast({
        title: "Product Unavailable",
        description: "This product is currently not available for purchase.",
        variant: "destructive"
      })
      return
    }

    if (product.stock <= 0) {
      console.log('Product out of stock')
      toast({
        title: "Out of Stock",
        description: "This product is currently out of stock.",
        variant: "destructive"
      })
      return
    }

    // Store product and customization in sessionStorage for checkout
    const orderData = {
      items: [{
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images.length > 0 ? product.images[0] : "/placeholder.svg",
        customization,
        quantity: 1,
      }],
      total: product.price,
      type: 'direct_purchase'
    }
    
    console.log('Storing order data:', orderData)
    try {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('directPurchase', JSON.stringify(orderData))
        console.log('Order data stored successfully')
        
        // Verify the data was stored
        const stored = sessionStorage.getItem('directPurchase')
        console.log('Stored data verification:', stored)
      }
    } catch (error) {
      console.error('Failed to store order data:', error)
      toast({
        title: "Error",
        description: "Failed to prepare checkout. Please try again.",
        variant: "destructive"
      })
      return
    }
    
    console.log('Redirecting to checkout...')
    try {
      router.push('/checkout')
    } catch (error) {
      console.error('Router push failed:', error)
      // Fallback to window.location
      if (typeof window !== 'undefined') {
        window.location.href = '/checkout'
      }
    }
  }

  const handleWishlistToggle = async () => {
    if (isInWishlist(product._id)) {
      await removeFromWishlist(product._id)
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      await addToWishlist({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images.length > 0 ? product.images[0] : "/placeholder.svg",
        category: product.category
      })
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`,
      })
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price)
  }

  const getDiscountPercentage = (originalPrice: number, currentPrice: number) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
      {/* Video Preview */}
      <div className="space-y-4">
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          {!isPlaying ? (
            <>
              <img
                src={product.images.length > 0 ? product.images[0] : "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Button
                  size="lg"
                  onClick={() => setIsPlaying(true)}
                  className="bg-white/20 hover:bg-white/30 text-white"
                >
                  <Play className="mr-2 h-4 w-4 sm:h-6 sm:w-6" />
                  <span className="hidden sm:inline">Play Preview</span>
                  <span className="sm:hidden">Play</span>
                </Button>
              </div>
            </>
          ) : (
            <video
              src="/placeholder-video.mp4"
              controls
              className="w-full h-full"
              onEnded={() => setIsPlaying(false)}
            />
          )}
        </div>

        {/* Thumbnail Gallery */}
        {product.images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} - Image ${index + 1}`}
                className="w-full h-16 sm:h-20 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            {product.isFeatured && (
              <Badge className="bg-yellow-500 text-xs sm:text-sm">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>
          
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            {product.description}
          </p>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-lg sm:text-xl text-gray-500 line-through ml-2">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <Badge className="ml-2 bg-red-500 text-xs sm:text-sm">
                    -{getDiscountPercentage(product.originalPrice, product.price)}%
                  </Badge>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm sm:text-base text-gray-600">
            <span>SKU: {product.sku}</span>
            <div className="flex items-center gap-2">
              <span>Stock:</span>
              {product.stock > 0 ? (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  {product.stock} available
                </Badge>
              ) : (
                <Badge variant="outline" className="text-red-600 border-red-600">
                  Out of stock
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Customization Options */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Customization Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="recipient-name" className="text-sm sm:text-base">Recipient Name</Label>
              <Input
                id="recipient-name"
                placeholder="Enter recipient name"
                value={customization.recipientName || ""}
                onChange={(e) => handleCustomizationChange("recipientName", e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="event-date" className="text-sm sm:text-base">Event Date</Label>
              <Input
                id="event-date"
                type="date"
                value={customization.eventDate || ""}
                onChange={(e) => handleCustomizationChange("eventDate", e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="special-message" className="text-sm sm:text-base">Special Message</Label>
              <Textarea
                id="special-message"
                placeholder="Add a special message for the recipient"
                value={customization.specialMessage || ""}
                onChange={(e) => handleCustomizationChange("specialMessage", e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          {/* Debug info - remove in production */}
          {process.env.NODE_ENV === 'development' && (
            <div className="text-xs text-gray-500 p-2 bg-gray-100 rounded">
              Debug: User: {user ? 'Logged in' : 'Not logged in'} | 
              Product Active: {product.isActive ? 'Yes' : 'No'} | 
              Stock: {product.stock}
              <br />
              <button 
                onClick={() => {
                  console.log('Test navigation to checkout')
                  router.push('/checkout')
                }}
                className="text-blue-600 underline"
              >
                Test Navigation
              </button>
            </div>
          )}
          
          <Button 
            onClick={(e) => {
              console.log('Button clicked!', e)
              handleBuyNow()
            }}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            size="lg"
            disabled={!product.isActive || product.stock <= 0}
          >
            <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            <span className="hidden sm:inline">
              {!product.isActive ? 'Product Unavailable' : product.stock <= 0 ? 'Out of Stock' : 'Buy Now'}
            </span>
            <span className="sm:hidden">
              {!product.isActive ? 'Unavailable' : product.stock <= 0 ? 'Out of Stock' : 'Buy Now'}
            </span>
          </Button>
          
          <div className="flex gap-3">
            <Button 
              onClick={handleAddToCart} 
              variant="outline"
              className="flex-1"
              size="lg"
              disabled={!product.isActive || product.stock <= 0}
            >
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span className="hidden sm:inline">
                {!product.isActive ? 'Unavailable' : product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
              </span>
              <span className="sm:hidden">
                {!product.isActive ? 'Unavailable' : product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
              </span>
            </Button>
            
            <Button 
              variant={isInWishlist(product._id) ? "default" : "outline"}
              onClick={handleWishlistToggle}
              className="flex-1"
              size="lg"
            >
              <Heart className={`h-4 w-4 sm:h-5 sm:w-5 mr-2 ${isInWishlist(product._id) ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">
                {isInWishlist(product._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </span>
              <span className="sm:hidden">
                {isInWishlist(product._id) ? 'Remove' : 'Wishlist'}
              </span>
            </Button>
          </div>
        </div>

        {/* Product Tags */}
        {product.tags && product.tags.length > 0 && (
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs sm:text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
