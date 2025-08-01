"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Package, 
  Heart,
  ShoppingCart,
  Star,
  Filter,
  SortAsc,
  SortDesc,
  Grid,
  List,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause
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

const categoryInfo = {
  'wedding': {
    name: 'Wedding',
    description: 'Beautiful wedding decorations and accessories for your special day',
    icon: '💒',
    color: 'bg-pink-100 text-pink-800',
    bannerColor: 'from-pink-500 to-rose-600',
    images: [
      '/images/wedding-1.jpg',
      '/images/wedding-2.jpg',
      '/images/wedding-3.jpg'
    ]
  },
  'birthday': {
    name: 'Birthday',
    description: 'Fun and colorful birthday party supplies to make celebrations memorable',
    icon: '🎂',
    color: 'bg-blue-100 text-blue-800',
    bannerColor: 'from-blue-500 to-indigo-600',
    images: [
      '/images/birthday-1.jpg',
      '/images/birthday-2.jpg',
      '/images/birthday-3.jpg'
    ]
  },
  'baby-shower': {
    name: 'Baby Shower',
    description: 'Adorable baby shower decorations and gifts for the little one',
    icon: '👶',
    color: 'bg-purple-100 text-purple-800',
    bannerColor: 'from-purple-500 to-violet-600',
    images: [
      '/images/baby-shower-1.jpg',
      '/images/baby-shower-2.jpg',
      '/images/baby-shower-3.jpg'
    ]
  },
  'house-party': {
    name: 'House Party',
    description: 'Everything you need for the perfect house party and celebrations',
    icon: '🏠',
    color: 'bg-green-100 text-green-800',
    bannerColor: 'from-green-500 to-emerald-600',
    images: [
      '/images/house-party-1.jpg',
      '/images/house-party-2.jpg',
      '/images/house-party-3.jpg'
    ]
  },
  'invitations': {
    name: 'Invitations',
    description: 'Elegant and stylish invitation cards for all occasions',
    icon: '✉️',
    color: 'bg-yellow-100 text-yellow-800',
    bannerColor: 'from-yellow-500 to-orange-600',
    images: [
      '/images/invitations-1.jpg',
      '/images/invitations-2.jpg',
      '/images/invitations-3.jpg'
    ]
  },
  'save-the-date': {
    name: 'Save the Date',
    description: 'Save the date cards for special occasions and events',
    icon: '📅',
    color: 'bg-red-100 text-red-800',
    bannerColor: 'from-red-500 to-pink-600',
    images: [
      '/images/save-the-date-1.jpg',
      '/images/save-the-date-2.jpg',
      '/images/save-the-date-3.jpg'
    ]
  }
}

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function CategoryDetailPage({ params }: CategoryPageProps) {
  const { category } = params
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [sortBy, setSortBy] = useState('newest')
  const [priceRange, setPriceRange] = useState('all')
  const [availability, setAvailability] = useState('all')
  const [featuredFilter, setFeaturedFilter] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  
  // Slideshow states
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const slideshowRef = useRef<HTMLDivElement>(null)

  const categoryData = categoryInfo[category as keyof typeof categoryInfo] || {
    name: category.charAt(0).toUpperCase() + category.slice(1),
    description: `Products in ${category} category`,
    icon: '📦',
    color: 'bg-gray-100 text-gray-800',
    bannerColor: 'from-gray-500 to-gray-600',
    images: []
  }

  // Get all categories for slideshow
  const allCategories = Object.entries(categoryInfo)

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  // Slideshow navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % allCategories.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + allCategories.length) % allCategories.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Auto-play slideshow
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [isPlaying, currentSlide])

  // Pause slideshow on hover
  const handleMouseEnter = () => setIsPlaying(false)
  const handleMouseLeave = () => setIsPlaying(true)

  useEffect(() => {
    fetchProducts()
  }, [category])

  useEffect(() => {
    applyFiltersAndSort()
  }, [products, sortBy, priceRange, availability, featuredFilter])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
      const response = await fetch(`${baseUrl}/api/products?category=${category}`)
      
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products || [])
      } else {
        setProducts([])
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const applyFiltersAndSort = () => {
    let filtered = [...products]

    // Apply price range filter
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number)
      filtered = filtered.filter(product => {
        if (max) {
          return product.price >= min && product.price <= max
        } else {
          return product.price >= min
        }
      })
    }

    // Apply availability filter
    if (availability !== 'all') {
      if (availability === 'in-stock') {
        filtered = filtered.filter(product => product.stock > 0)
      } else if (availability === 'out-of-stock') {
        filtered = filtered.filter(product => product.stock === 0)
      }
    }

    // Apply featured filter
    if (featuredFilter !== 'all') {
      if (featuredFilter === 'featured') {
        filtered = filtered.filter(product => product.isFeatured)
      } else if (featuredFilter === 'not-featured') {
        filtered = filtered.filter(product => !product.isFeatured)
      }
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'featured':
        filtered.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1
          if (!a.isFeatured && b.isFeatured) return 1
          return 0
        })
        break
    }

    setFilteredProducts(filtered)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className={`bg-gradient-to-r ${categoryData.bannerColor} text-white`}>
          <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
            <div className="text-center">
              <div className="flex items-center justify-center mb-3 sm:mb-4">
                <span className="text-3xl sm:text-4xl md:text-5xl mr-3 sm:mr-4">{categoryData.icon}</span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                  {categoryData.name}
                </h1>
              </div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-4 sm:mb-6 opacity-90 px-2">
                {categoryData.description}
              </p>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner with Slideshow */}
      <div className="relative overflow-hidden">
        {/* Slideshow Container */}
        <div 
          ref={slideshowRef}
          className="relative h-64 sm:h-80 md:h-96 lg:h-[500px]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {allCategories.map(([key, info], index) => (
            <div
              key={key}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
              }`}
            >
              <div className={`bg-gradient-to-r ${info.bannerColor} text-white h-full flex items-center justify-center relative`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 text-6xl sm:text-8xl">{info.icon}</div>
                  <div className="absolute bottom-4 right-4 text-4xl sm:text-6xl">{info.icon}</div>
                </div>
                
                {/* Content */}
                <div className="text-center relative z-10 px-4">
                  <div className="flex items-center justify-center mb-3 sm:mb-4">
                    <span className="text-4xl sm:text-5xl md:text-6xl mr-3 sm:mr-4">{info.icon}</span>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                      {info.name}
                    </h1>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-4 sm:mb-6 opacity-90">
                    {info.description}
                  </p>
                  <Link href={`/category/${key}`}>
                    <Button 
                      size="lg" 
                      variant="secondary"
                      className="bg-white text-gray-900 hover:bg-gray-100"
                    >
                      Explore {info.name}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
          aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {allCategories.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Swipe Hint for Mobile */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white/70 text-xs sm:hidden">
          ← Swipe to navigate →
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {products.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="max-w-md mx-auto px-4">
              <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">{categoryData.icon}</div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                No {categoryData.name} Products Yet
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                We're working on bringing you amazing {categoryData.name.toLowerCase()} products. 
                Check back soon or explore our other categories!
              </p>
              <div className="space-y-4">
                <Link href="/">
                  <Button size="lg">
                    Back to Home
                  </Button>
                </Link>
                <div className="text-xs sm:text-sm text-gray-500">
                  Or explore other categories:
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {Object.entries(categoryInfo).map(([key, info]) => (
                    key !== category && (
                      <Link key={key} href={`/category/${key}`}>
                        <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 text-xs sm:text-sm">
                          {info.icon} {info.name}
                        </Badge>
                      </Link>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Filters and Sorting Bar */}
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-4 sm:mb-6">
              <div className="flex flex-col gap-3 sm:gap-4">
                {/* Filters Section */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Filters:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <select 
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 min-w-[120px]"
                    >
                      <option value="all">Price Range</option>
                      <option value="0-500">Under ₹500</option>
                      <option value="500-1000">₹500 - ₹1,000</option>
                      <option value="1000-2000">₹1,000 - ₹2,000</option>
                      <option value="2000-">Above ₹2,000</option>
                    </select>
                    <select 
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 min-w-[100px]"
                    >
                      <option value="all">Availability</option>
                      <option value="in-stock">In Stock</option>
                      <option value="out-of-stock">Out of Stock</option>
                    </select>
                    <select 
                      value={featuredFilter}
                      onChange={(e) => setFeaturedFilter(e.target.value)}
                      className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 min-w-[100px]"
                    >
                      <option value="all">Featured</option>
                      <option value="featured">Featured Only</option>
                      <option value="not-featured">Not Featured</option>
                    </select>
                  </div>
                </div>
                
                {/* Sorting Section */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <SortAsc className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Sort by:</span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="text-sm border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 min-w-[140px]"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="name">Name A-Z</option>
                      <option value="featured">Featured First</option>
                    </select>
                    
                    <div className="flex items-center gap-1 border border-gray-300 rounded-md">
                      <Button 
                        variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => setViewMode('grid')}
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant={viewMode === 'list' ? 'default' : 'ghost'} 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => setViewMode('list')}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {filteredProducts.map((product) => (
                  <ProductCardList key={product._id} product={product} />
                ))}
              </div>
            )}

            {/* Results count */}
            <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-8 sm:mt-12">
              <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Can't find what you're looking for?
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  Explore our other categories or contact us for custom requests.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Link href="/">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      Back to Home
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="sm" className="w-full sm:w-auto">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// Product Card Component (Grid View)
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
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
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
              <Package className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
            </div>
          )}
        </div>
        
        {product.isFeatured && (
          <Badge className="absolute top-1 sm:top-2 left-1 sm:left-2 bg-yellow-500 text-white text-xs">
            <Star className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
            <span className="hidden sm:inline">Featured</span>
            <span className="sm:hidden">★</span>
          </Badge>
        )}
        
        {product.originalPrice && product.originalPrice > product.price && (
          <Badge className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-red-500 text-white text-xs">
            -{getDiscountPercentage(product.originalPrice, product.price)}%
          </Badge>
        )}
      </div>

      <CardContent className="p-2 sm:p-3">
        <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 line-clamp-2 text-xs sm:text-sm">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <div>
            <span className="text-sm sm:text-base font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-gray-500 line-through ml-1 sm:ml-2">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex gap-1 sm:gap-2">
          <Link href={`/product/${product._id}`} className="flex-1">
            <Button className="w-full" size="sm">
              <ShoppingCart className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">View Details</span>
              <span className="sm:hidden">View</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

// Product Card Component (List View)
function ProductCardList({ product }: { product: Product }) {
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
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
      <div className="flex">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 flex-shrink-0">
          {product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover rounded-l-lg"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-l-lg">
              <Package className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
            </div>
          )}
          
          {product.isFeatured && (
            <Badge className="absolute top-1 left-1 bg-yellow-500 text-white text-xs">
              <Star className="h-2 w-2 mr-1" />
              <span className="hidden sm:inline">Featured</span>
              <span className="sm:hidden">★</span>
            </Badge>
          )}
          
          {product.originalPrice && product.originalPrice > product.price && (
            <Badge className="absolute top-1 right-1 bg-red-500 text-white text-xs">
              -{getDiscountPercentage(product.originalPrice, product.price)}%
            </Badge>
          )}
        </div>

        <div className="flex-1 p-2 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between h-full">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                <span>Stock: {product.stock}</span>
                <span className="hidden sm:inline">SKU: {product.sku}</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-2 sm:mt-0">
              <div className="text-right">
                <span className="text-sm sm:text-lg font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="text-xs sm:text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </div>
                )}
              </div>
              <Link href={`/product/${product._id}`}>
                <Button size="sm">
                  <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">View Details</span>
                  <span className="sm:hidden">View</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}