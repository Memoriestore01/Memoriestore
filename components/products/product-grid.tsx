import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Star, ShoppingCart, Heart, Package } from "lucide-react"
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

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
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

  const handleAddToCart = async (product: Product) => {
    await addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images.length > 0 ? product.images[0] : "/placeholder.svg",
      customization: {},
      quantity: 1,
    })
  }

  const handleWishlistToggle = async (product: Product) => {
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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product) => (
        <Card key={product._id} className="group hover:shadow-lg transition-shadow">
          <CardContent className="p-0">
            <div className="relative aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
              {product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <Package className="h-8 w-8 text-gray-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button size="sm" variant="secondary">
                  <Play className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </div>
              {product.isFeatured && <Badge className="absolute top-2 left-2 bg-orange-500 text-xs">Featured</Badge>}
              {product.originalPrice && product.originalPrice > product.price && (
                <Badge className="absolute top-2 right-2 bg-red-500 text-xs">
                  -{getDiscountPercentage(product.originalPrice, product.price)}%
                </Badge>
              )}
            </div>

            <div className="p-3">
              <h3 className="font-semibold mb-2 line-clamp-2 text-sm">{product.name}</h3>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base">₹{product.price}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Add to Cart
                </Button>
                <Button 
                  variant={isInWishlist(product._id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleWishlistToggle(product)}
                >
                  <Heart className={`h-3 w-3 ${isInWishlist(product._id) ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
