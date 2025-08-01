"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Package, 
  Heart,
  ShoppingCart,
  Star,
  ArrowRight,
  Sparkles
} from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"

interface Product {
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

const categoryInfo = {
  'wedding': {
    name: 'Wedding',
    description: 'Beautiful wedding decorations and accessories',
    icon: '💒',
    color: 'bg-pink-100 text-pink-800'
  },
  'birthday': {
    name: 'Birthday',
    description: 'Fun and colorful birthday party supplies',
    icon: '🎂',
    color: 'bg-blue-100 text-blue-800'
  },
  'baby-shower': {
    name: 'Baby Shower',
    description: 'Adorable baby shower decorations and gifts',
    icon: '👶',
    color: 'bg-purple-100 text-purple-800'
  },
  'house-party': {
    name: 'House Party',
    description: 'Everything you need for the perfect house party',
    icon: '🏠',
    color: 'bg-green-100 text-green-800'
  },
  'invitations': {
    name: 'Invitations',
    description: 'Elegant and stylish invitation cards',
    icon: '✉️',
    color: 'bg-yellow-100 text-yellow-800'
  },
  'save-the-date': {
    name: 'Save the Date',
    description: 'Save the date cards for special occasions',
    icon: '📅',
    color: 'bg-red-100 text-red-800'
  }
}

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('/api/products?featured=true&limit=8')
      if (response.ok) {
        const data = await response.json()
        setFeaturedProducts(data.products)
      }
    } catch (error) {
      console.error('Error fetching featured products:', error)
      toast.error('Failed to fetch featured products')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">
              Welcome to Memoriestore
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Your one-stop destination for all your celebration needs. From weddings to birthdays, 
              we have everything to make your special moments unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 border-0 shadow-lg">
                  Shop All Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 border-0 shadow-lg">
                  Browse Categories
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our carefully curated categories to find exactly what you need for your special occasions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(categoryInfo).map(([key, category]) => (
              <Link key={key} href={`/category/${key}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {category.description}
                    </p>
                    <div className="mt-4">
                      <Badge className={category.color}>
                        Shop Now
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              <Sparkles className="inline mr-2 h-8 w-8 text-yellow-500" />
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked collection of premium products that our customers love.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading featured products...</p>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No featured products yet</h3>
              <p className="text-gray-600 mb-4">
                Check back soon for our featured collection!
              </p>
              <Link href="/category">
                <Button>
                  Browse All Products
                </Button>
              </Link>
            </div>
          )}

          {featuredProducts.length > 0 && (
            <div className="text-center mt-8">
              <Link href="/shop">
                <Button variant="outline" size="lg">
                  View All Featured Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers who trust Memoriestore for their celebration needs.
          </p>
          <Link href="/categories">
            <Button size="lg" variant="secondary">
              Explore Our Collection
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

// Product Card Component
function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price)
  }

  const getDiscountPercentage = (originalPrice: number, currentPrice: number) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
  }

  const handleAddToCart = async () => {
    await addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images.length > 0 ? product.images[0] : "/placeholder.svg",
      customization: {},
      quantity: 1,
    })
  }

  const handleWishlistToggle = async () => {
    if (isInWishlist(product._id)) {
      await removeFromWishlist(product._id)
    } else {
      await addToWishlist({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images.length > 0 ? product.images[0] : "/placeholder.svg",
        category: product.category
      })
    }
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <div className="aspect-square overflow-hidden rounded-t-lg">
          {product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
          )}
        </div>
        
        {product.isFeatured && (
          <Badge className="absolute top-2 left-2 bg-yellow-500">
            <Star className="h-3 w-3 mr-1" />
            Featured
          </Badge>
        )}
        
        {product.originalPrice && product.originalPrice > product.price && (
          <Badge className="absolute top-2 right-2 bg-red-500">
            -{getDiscountPercentage(product.originalPrice, product.price)}%
          </Badge>
        )}
      </div>

      <CardContent className="p-3">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-base font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-gray-500 line-through ml-2">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button className="flex-1" size="sm" onClick={handleAddToCart}>
            <ShoppingCart className="h-3 w-3 mr-1" />
            Add to Cart
          </Button>
          <Button 
            variant={isInWishlist(product._id) ? "default" : "outline"} 
            size="sm"
            onClick={handleWishlistToggle}
          >
            <Heart className={`h-3 w-3 ${isInWishlist(product._id) ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
