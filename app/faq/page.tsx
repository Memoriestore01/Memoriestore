"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronUp, Search } from "lucide-react"

const faqCategories = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "How do I create my first video invitation?",
        answer:
          "Simply browse our template categories, select a design you like, click 'Customize', fill in your event details, and proceed to checkout. Your personalized video will be ready for download immediately after payment.",
      },
      {
        question: "Do I need to create an account to purchase?",
        answer:
          "Yes, creating an account helps us save your customizations and allows you to access your purchased videos anytime from your dashboard.",
      },
      {
        question: "What information do I need to provide for customization?",
        answer:
          "Typically, you'll need event details like names, date, time, venue, and any special message you'd like to include. Each template has specific customization fields.",
      },
    ],
  },
  {
    category: "Pricing & Payment",
    questions: [
      {
        question: "What are your pricing plans?",
        answer:
          "Our video invitations range from ₹99 to ₹599 depending on the complexity and features. We often have special offers and discounts available.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major payment methods through Razorpay including UPI, credit/debit cards, net banking, and digital wallets.",
      },
      {
        question: "Is there a refund policy?",
        answer:
          "Yes, we offer a 100% refund if you're not satisfied with your video invitation within 24 hours of purchase, provided you haven't downloaded the final video.",
      },
      {
        question: "Are there any hidden charges?",
        answer: "No, the price you see is the final price. There are no hidden charges or additional fees.",
      },
    ],
  },
  {
    category: "Customization & Design",
    questions: [
      {
        question: "Can I modify the template colors and fonts?",
        answer:
          "Our templates come with predefined color schemes and fonts that are professionally designed. However, you can customize all text content, dates, names, and messages.",
      },
      {
        question: "Can I add my own photos to the video?",
        answer:
          "Currently, our templates use stock imagery and graphics. We're working on adding custom photo upload features in future updates.",
      },
      {
        question: "How many revisions can I make?",
        answer:
          "You can make unlimited revisions to your customization before finalizing your purchase. After purchase, you can request changes within 24 hours at no extra cost.",
      },
      {
        question: "Can I preview my video before purchasing?",
        answer: "Yes, you can preview a watermarked version of your customized video before making the payment.",
      },
    ],
  },
  {
    category: "Technical Support",
    questions: [
      {
        question: "What video format will I receive?",
        answer:
          "All videos are delivered in MP4 format in HD quality (1080p) which is compatible with all devices and social media platforms.",
      },
      {
        question: "How long are the video invitations?",
        answer:
          "Most of our video invitations are between 30-60 seconds long, which is perfect for sharing on social media and messaging apps.",
      },
      {
        question: "Can I download my video multiple times?",
        answer:
          "Yes, once purchased, you can download your video invitation multiple times from your account dashboard.",
      },
      {
        question: "What if I face technical issues during customization?",
        answer:
          "Our support team is available 24/7 to help you with any technical issues. You can reach us via email, phone, or live chat.",
      },
    ],
  },
  {
    category: "Sharing & Distribution",
    questions: [
      {
        question: "How can I share my video invitation?",
        answer:
          "You can share your video invitation via WhatsApp, email, social media platforms, or any messaging app. The MP4 format ensures compatibility everywhere.",
      },
      {
        question: "Is there a limit on how many people I can share with?",
        answer:
          "No, there's no limit. Once you purchase and download your video, you can share it with as many people as you want.",
      },
      {
        question: "Can I upload the video to social media?",
        answer:
          "Our videos are optimized for social media platforms including Instagram, Facebook, WhatsApp Status, and more.",
      },
    ],
  },
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const filteredFAQs = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <div className="container py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <Badge className="mb-4">FAQ</Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Frequently Asked
          <span className="block text-purple-600">Questions</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Find answers to common questions about Memoriestore video invitations
        </p>

        {/* Search */}
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="max-w-4xl mx-auto">
        {filteredFAQs.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-purple-600">{category.category}</h2>
            <div className="space-y-4">
              {category.questions.map((faq, faqIndex) => {
                const itemId = `${categoryIndex}-${faqIndex}`
                const isOpen = openItems.includes(itemId)

                return (
                  <Card key={faqIndex} className="overflow-hidden">
                    <CardContent className="p-0">
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full p-6 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                      >
                        <h3 className="font-semibold pr-4">{faq.question}</h3>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        ))}

        {filteredFAQs.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No FAQs found matching your search.</p>
            <p className="text-gray-500 mt-2">Try different keywords or browse all categories above.</p>
          </div>
        )}
      </div>

      {/* Contact CTA */}
      <div className="bg-purple-50 rounded-2xl p-8 text-center mt-16">
        <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
        <p className="text-gray-600 mb-6">
          Can't find the answer you're looking for? Our support team is here to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Contact Support
          </a>
          <a
            href="mailto:memoriestore01@gmail.com"
            className="inline-flex items-center justify-center px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
          >
            Email Us
          </a>
        </div>
      </div>
    </div>
  )
}
