import { Card, CardContent } from "@/components/ui/card"
import { Zap, Palette, Download, Headphones } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Quick Customization",
    description: "Customize your video invitation in just a few minutes with our easy-to-use editor.",
  },
  {
    icon: Palette,
    title: "Professional Design",
    description: "All templates are designed by professional artists and motion graphics experts.",
  },
  {
    icon: Download,
    title: "Instant Download",
    description: "Get your customized video invitation instantly after purchase. No waiting time.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our customer support team is always ready to help you with any questions.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose InviteVids?</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We make creating beautiful video invitations simple, fast, and affordable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-4">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
