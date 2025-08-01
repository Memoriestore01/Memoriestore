"use client"

import { useWishlist } from "@/contexts/wishlist-context"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Heart, 
  Trash2, 
  ArrowLeft,
  ShoppingCart,
  Package
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist()
  const { addItem } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price)
  }

  const handleAddToCart = async (item: any) => {
    await addItem({
      productId: item.productId,
      name: item.name,
      price: item.price,
      image: item.image,
      customization: {},
      quantity: 1,
    })
    toast.success(`${item.name} added to cart`)
  }

  const handleRemoveFromWishlist = async (productId: string) => {
    await removeFromWishlist(productId)
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h1>
            <p className="text-gray-600 mb-6">Add some products to your wishlist to save them for later.</p>
            <Link href="/categories">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/categories">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
          
          <Button
            variant="outline"
            onClick={clearWishlist}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Wishlist
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-600">{wishlistItems.length} items</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 p-6">
                         {wishlistItems.map((item) => (
               <Card key={item.productId} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="aspect-square overflow-hidden rounded-t-lg">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <Package className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                                         <Button
                       variant="ghost"
                       size="sm"
                       onClick={() => handleRemoveFromWishlist(item.productId)}
                       className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-600 hover:text-red-700"
                     >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="p-3">
                    <div className="mb-2">
                      <Badge variant="outline" className="text-xs px-1 py-0">
                        {item.category}
                      </Badge>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-xs sm:text-sm">
                      {item.name}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm sm:text-base font-bold text-gray-900">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1" 
                        size="sm" 
                        onClick={() => handleAddToCart(item)}
                      >
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        <span className="hidden sm:inline">Add to Cart</span>
                        <span className="sm:hidden">Add</span>
                      </Button>
                    </div>
                    
                    <div className="text-xs text-gray-500 mt-2 hidden sm:block">
                      Added on {new Date(item.addedAt).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}