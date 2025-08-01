import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

const categoryInfo = {
  'wedding': {
    name: 'Wedding',
    description: 'Beautiful wedding decorations and accessories for your special day',
    icon: '💒',
    color: 'bg-pink-100 text-pink-800',
    bannerColor: 'from-pink-500 to-rose-600',
    gradient: 'from-pink-500 to-rose-600'
  },
  'birthday': {
    name: 'Birthday',
    description: 'Fun and colorful birthday party supplies to make celebrations memorable',
    icon: '🎂',
    color: 'bg-blue-100 text-blue-800',
    bannerColor: 'from-blue-500 to-indigo-600',
    gradient: 'from-blue-500 to-indigo-600'
  },
  'baby-shower': {
    name: 'Baby Shower',
    description: 'Adorable baby shower decorations and gifts for the little one',
    icon: '👶',
    color: 'bg-purple-100 text-purple-800',
    bannerColor: 'from-purple-500 to-violet-600',
    gradient: 'from-purple-500 to-violet-600'
  },
  'house-party': {
    name: 'House Party',
    description: 'Everything you need for the perfect house party and celebrations',
    icon: '🏠',
    color: 'bg-green-100 text-green-800',
    bannerColor: 'from-green-500 to-emerald-600',
    gradient: 'from-green-500 to-emerald-600'
  },
  'invitations': {
    name: 'Invitations',
    description: 'Elegant and stylish invitation cards for all occasions',
    icon: '✉️',
    color: 'bg-yellow-100 text-yellow-800',
    bannerColor: 'from-yellow-500 to-orange-600',
    gradient: 'from-yellow-500 to-orange-600'
  },
  'save-the-date': {
    name: 'Save the Date',
    description: 'Save the date cards for special occasions and events',
    icon: '📅',
    color: 'bg-red-100 text-red-800',
    bannerColor: 'from-red-500 to-pink-600',
    gradient: 'from-red-500 to-pink-600'
  }
}

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Shop by Category
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Explore our carefully curated categories to find exactly what you need for your special occasions.
            </p>
            <div className="flex items-center justify-center">
              <Sparkles className="h-6 w-6 mr-2" />
              <span className="text-lg">Discover amazing products for every celebration</span>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(categoryInfo).map(([key, category]) => (
            <Link key={key} href={`/category/${key}`}>
              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg overflow-hidden">
                <div className={`bg-gradient-to-r ${category.gradient} h-32 flex items-center justify-center`}>
                  <span className="text-6xl">{category.icon}</span>
                </div>
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {category.description}
                    </p>
                    <Button className="w-full group-hover:bg-gray-900 group-hover:text-white transition-colors">
                      Explore {category.name}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-gray-600 mb-6">
              We're constantly adding new products and categories. Contact us for custom requests or special orders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">
                  Contact Us
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 