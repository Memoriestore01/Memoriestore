"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, Star, Sparkles, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    category: "Wedding",
    title: "Create Stunning",
    subtitle: "Wedding Invitations",
    description: "Elegant and romantic video invitations for your special day. Customize with your love story, photos, and perfect moments.",
    gradient: "from-rose-600 via-pink-600 to-purple-600",
    accentColor: "text-rose-300",
    accentBg: "bg-rose-100",
    accentBorder: "border-rose-200",
    features: ["Elegant Designs", "Love Story Integration", "Guest RSVP"],
    price: "₹299",
    href: "/category/wedding",
    icon: "💒"
  },
  {
    id: 2,
    category: "Birthday",
    title: "Celebrate with",
    subtitle: "Birthday Invitations",
    description: "Fun and vibrant video invitations for birthdays. Add music, animations, and personal touches to make it unforgettable.",
    gradient: "from-blue-600 via-purple-600 to-pink-600",
    accentColor: "text-blue-300",
    accentBg: "bg-blue-100",
    accentBorder: "border-blue-200",
    features: ["Vibrant Animations", "Music Integration", "Age Themes"],
    price: "₹199",
    href: "/category/birthday",
    icon: "🎂"
  },
  {
    id: 3,
    category: "Invitations Cards",
    title: "Professional",
    subtitle: "Invitation Cards",
    description: "All types of invitation cards for any occasion. From corporate events to personal celebrations, we have it all.",
    gradient: "from-gray-600 via-slate-600 to-zinc-600",
    accentColor: "text-gray-300",
    accentBg: "bg-gray-100",
    accentBorder: "border-gray-200",
    features: ["Corporate Design", "Multiple Formats", "Quick Delivery"],
    price: "₹149",
    href: "/category/invitations",
    icon: "📋"
  },
  {
    id: 4,
    category: "House Party",
    title: "Host Amazing",
    subtitle: "House Parties",
    description: "Casual and fun video invitations for house parties. Perfect for get-togethers, game nights, and celebrations.",
    gradient: "from-green-600 via-emerald-600 to-teal-600",
    accentColor: "text-green-300",
    accentBg: "bg-green-100",
    accentBorder: "border-green-200",
    features: ["Casual Style", "Party Themes", "Easy Sharing"],
    price: "₹99",
    href: "/category/house-party",
    icon: "🏠"
  },
  {
    id: 5,
    category: "Baby Shower",
    title: "Welcome New",
    subtitle: "Baby Arrivals",
    description: "Sweet and adorable video invitations for baby showers. Celebrate the upcoming arrival with family and friends.",
    gradient: "from-pink-600 via-rose-600 to-purple-600",
    accentColor: "text-pink-300",
    accentBg: "bg-pink-100",
    accentBorder: "border-pink-200",
    features: ["Baby Themes", "Gender Reveals", "Family Focused"],
    price: "₹249",
    href: "/category/baby-shower",
    icon: "👶"
  },
  {
    id: 6,
    category: "Save the Date",
    title: "Mark Your",
    subtitle: "Special Date",
    description: "Elegant save the date announcements. Let everyone know about your upcoming celebration well in advance.",
    gradient: "from-purple-600 via-violet-600 to-indigo-600",
    accentColor: "text-purple-300",
    accentBg: "bg-purple-100",
    accentBorder: "border-purple-200",
    features: ["Elegant Design", "Date Highlighting", "Early Notice"],
    price: "₹179",
    href: "/category/save-the-date",
    icon: "📅"
  }
]

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [currentSlide])

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setCurrentSlide((prev) => (prev + 1) % slides.length)
      setTimeout(() => setIsTransitioning(false), 300)
    }
  }

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
      setTimeout(() => setIsTransitioning(false), 300)
    }
  }

  const goToSlide = (index: number) => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setCurrentSlide(index)
      setTimeout(() => setIsTransitioning(false), 300)
    }
  }

  // Touch handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }
  }

  const currentSlideData = slides[currentSlide]

  return (
    <section 
      ref={sectionRef}
      className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative py-12 md:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-4 md:space-y-6">
            {/* Category Badge */}
            <div className={`inline-flex items-center gap-2 ${currentSlideData.accentBg} ${currentSlideData.accentBorder} border backdrop-blur-sm px-3 py-1.5 md:px-3 md:py-2 rounded-full text-xs font-medium text-gray-800`}>
              <span className="text-sm md:text-base">{currentSlideData.icon}</span>
              <span>{currentSlideData.category}</span>
            </div>

            <div className="space-y-3 md:space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {currentSlideData.title}
                <span className={`block ${currentSlideData.accentColor} bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent`}>
                  {currentSlideData.subtitle}
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-purple-100 max-w-2xl mx-auto leading-relaxed">
                {currentSlideData.description}
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-1.5 md:gap-2 justify-center">
              {currentSlideData.features.map((feature, index) => (
                <span key={index} className={`${currentSlideData.accentBg} ${currentSlideData.accentBorder} border px-2 py-1 md:px-3 md:py-1.5 rounded-full text-xs text-gray-700 font-medium`}>
                  {feature}
                </span>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <Link href={currentSlideData.href} className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-white text-purple-600 hover:bg-gray-100 hover:scale-105 transition-all duration-200 font-semibold px-4 py-2.5 md:px-6 md:py-3 text-sm md:text-base shadow-lg hover:shadow-xl"
                >
                  View {currentSlideData.category}
                  <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
                </Button>
              </Link>
            </div>

            {/* Price */}
            <div className={`inline-flex items-center gap-2 ${currentSlideData.accentBg} ${currentSlideData.accentBorder} border px-3 py-1.5 md:px-4 md:py-2 rounded-full text-gray-800 font-semibold`}>
              <span className="text-xs opacity-80">Starting at</span>
              <span className="text-sm md:text-base">{currentSlideData.price}</span>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3 md:gap-4">
          {/* Previous Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
          >
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
          </Button>

          {/* Slide Indicators */}
          <div className="flex gap-1.5 md:gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white scale-125' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
          >
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
