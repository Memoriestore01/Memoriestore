import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Star } from "lucide-react"

const featuredProducts = [
  {
    id: "1",
    title: "Elegant Rose Wedding Invitation",
    category: "Wedding",
    price: 299,
    originalPrice: 399,
    rating: 4.9,
    reviews: 156,
    thumbnail: "/placeholder.svg?height=300&width=400",
    isPopular: true,
  },
  {
    id: "2",
    title: "Colorful Birthday Celebration",
    category: "Birthday",
    price: 199,
    originalPrice: 249,
    rating: 4.8,
    reviews: 89,
    thumbnail: "/placeholder.svg?height=300&width=400",
    isPopular: false,
  },
  {
    id: "3",
    title: "Professional Corporate Event",
    category: "Office Party",
    price: 349,
    originalPrice: 449,
    rating: 4.7,
    reviews: 67,
    thumbnail: "/placeholder.svg?height=300&width=400",
    isPopular: true,
  },
  {
    id: "4",
    title: "Cute Baby Shower Invitation",
    category: "Baby Shower",
    price: 249,
    originalPrice: 299,
    rating: 4.9,
    reviews: 134,
    thumbnail: "/placeholder.svg?height=300&width=400",
    isPopular: false,
  },
]

export function FeaturedProducts() {
  return (
    <section className="container py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Templates</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Our most popular and highly-rated video invitation templates
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="relative aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                <img
                  src={product.thumbnail || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button size="sm" variant="secondary">
                    <Play className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                </div>
                {product.isPopular && <Badge className="absolute top-2 left-2 bg-orange-500">Popular</Badge>}
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                </div>

                <h3 className="font-semibold mb-2 line-clamp-2">{product.title}</h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">₹{product.price}</span>
                    <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                  </div>
                  <Link href={`/product/${product.id}`}>
                    <Button size="sm">View</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link href="/category/all">
          <Button size="lg" variant="outline">
            View All Templates
          </Button>
        </Link>
      </div>
    </section>
  )
}
