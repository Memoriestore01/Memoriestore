import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Gift, Briefcase, Home, Baby, Calendar } from "lucide-react"

const categories = [
  {
    name: "Wedding",
    icon: Heart,
    href: "/category/wedding",
    description: "Beautiful wedding decorations and accessories",
    color: "bg-rose-100 text-rose-600",
  },
  {
    name: "Birthday",
    icon: Gift,
    href: "/category/birthday",
    description: "Fun and colorful birthday party supplies",
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Invitations",
    icon: Briefcase,
    href: "/category/invitations",
    description: "Elegant and stylish invitation cards",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    name: "House Party",
    icon: Home,
    href: "/category/house-party",
    description: "Everything you need for the perfect house party",
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Baby Shower",
    icon: Baby,
    href: "/category/baby-shower",
    description: "Adorable baby shower decorations and gifts",
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "Save the Date",
    icon: Calendar,
    href: "/category/save-the-date",
    description: "Save the date cards for special occasions",
    color: "bg-red-100 text-red-600",
  },
]

export function Categories() {
  return (
    <section className="container py-12 md:py-16">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">Shop by Category</h2>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto px-4">
          Explore our carefully curated categories to find exactly what you need for your special occasions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <Link key={category.name} href={category.href} className="block">
              <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group hover:scale-105">
                <CardContent className="p-4 md:p-6 text-center">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full ${category.color} mb-3 md:mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="h-6 w-6 md:h-8 md:w-8" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm md:text-base">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
