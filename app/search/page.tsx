import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Package, 
  Heart,
  ShoppingCart,
  Star,
  Search,
  ArrowLeft
} from "lucide-react"
import Link from "next/link"

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

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

async function searchProducts(query: string): Promise<Product[]> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/products?search=${encodeURIComponent(query)}`, {
      next: { revalidate: 60 }
    })
    
    if (response.ok) {
      const data = await response.json()
      return data.products || []
    }
    return []
  } catch (error) {
    console.error('Error searching products:', error)
    return []
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""
  const products = query ? await searchProducts(query) : []

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="flex items-center mb-4 sm:mb-6">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Back</span>
              </Button>
            </Link>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Search className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 mr-2" />
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Search Results</h1>
            </div>
            {query && (
              <p className="text-sm sm:text-base text-gray-600">
                Showing results for "<span className="font-semibold text-purple-600">{query}</span>"
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {!query ? (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No search query</h2>
            <p className="text-gray-600 mb-6">Please enter a search term to find products.</p>
            <Link href="/">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No products found</h2>
            <p className="text-gray-600 mb-6">
              We couldn't find any products matching "<span className="font-semibold">{query}</span>".
            </p>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">Try:</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Checking your spelling</li>
                <li>• Using more general keywords</li>
                <li>• Browsing our categories instead</li>
              </ul>
            </div>
            <div className="mt-6 space-x-4">
              <Link href="/category">
                <Button variant="outline">
                  Browse Categories
                </Button>
              </Link>
              <Link href="/">
                <Button>
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <p className="text-sm sm:text-base text-gray-600">
                Found <span className="font-semibold text-purple-600">{products.length}</span> product{products.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {products.length > 0 && (
              <div className="text-center mt-8">
                <p className="text-gray-600 mb-4">Can't find what you're looking for?</p>
                <div className="space-x-4">
                  <Link href="/category">
                    <Button variant="outline">
                      Browse All Categories
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button>
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// Product Card Component
function ProductCard({ product }: { product: Product }) {
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
              <Package className="h-8 w-8 text-gray-400" />
            </div>
          )}
        </div>
        
        {product.isFeatured && (
          <Badge className="absolute top-2 left-2 bg-yellow-500 text-xs">
            <Star className="h-3 w-3 mr-1" />
            Featured
          </Badge>
        )}
        
        {product.originalPrice && product.originalPrice > product.price && (
          <Badge className="absolute top-2 right-2 bg-red-500 text-xs">
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
          <Link href={`/product/${product._id}`} className="flex-1">
            <Button className="w-full" size="sm">
              <ShoppingCart className="h-3 w-3 mr-1" />
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
} 