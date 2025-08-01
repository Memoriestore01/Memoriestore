import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Priya Sharma",
    event: "Wedding",
    rating: 5,
    comment:
      "The wedding invitation video was absolutely stunning! Our guests were amazed by the quality and creativity.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Rahul Gupta",
    event: "Birthday Party",
    rating: 5,
    comment:
      "Perfect for my daughter's birthday party. The customization was so easy and the final video was beautiful.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Sneha Patel",
    event: "Baby Shower",
    rating: 5,
    comment: "Loved the baby shower template! It was exactly what I was looking for. Highly recommend Memoriestore.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

export function Testimonials() {
  return (
    <section className="container py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Join thousands of satisfied customers who have created amazing video invitations with Memoriestore
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.event}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
