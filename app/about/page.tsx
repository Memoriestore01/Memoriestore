import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Award, Heart, Zap, Star, Calendar, Globe, Smile } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const values = [
  {
    icon: Heart,
    title: "Passion for Memories",
    description: "We believe every moment deserves to be celebrated beautifully and shared with love.",
    color: "bg-red-50 text-red-600"
  },
  {
    icon: Award,
    title: "Quality Excellence",
    description: "Our templates are crafted by professional designers to ensure the highest quality output.",
    color: "bg-yellow-50 text-yellow-600"
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Your satisfaction is our priority. We're here to help make your celebrations perfect.",
    color: "bg-blue-50 text-blue-600"
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We continuously evolve our platform to bring you the latest in video invitation technology.",
    color: "bg-purple-50 text-purple-600"
  },
]

const team = [
  {
    name: "Bhupender Sharma",
    role: "CEO & Founder",
    image: "/Bhupender_Sharma.png",
    description: "Visionary leader driving Memoriestore's mission to create unforgettable celebration experiences.",
    linkedin: "#",
    twitter: "#"
  },
  {
    name: "Bhupender Sharma",
    role: "Creative Director",
    image: "/Bhupender.png",
    description: "Creative genius behind our stunning designs and innovative visual experiences.",
    linkedin: "#",
    twitter: "#"
  },
]

const stats = [
  {
    number: "10,000+",
    label: "Happy Customers",
    icon: Smile,
    color: "text-green-600"
  },
  {
    number: "50,000+",
    label: "Invitations Created",
    icon: Calendar,
    color: "text-blue-600"
  },
  {
    number: "100+",
    label: "Template Designs",
    icon: Star,
    color: "text-yellow-600"
  },
  {
    number: "4.9/5",
    label: "Customer Rating",
    icon: Star,
    color: "text-purple-600"
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-20 sm:py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
              About Memoriestore
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Creating Beautiful Memories,
              <span className="block text-pink-200">One Invitation at a Time</span>
            </h1>
            <p className="text-xl sm:text-2xl text-pink-100 max-w-3xl mx-auto leading-relaxed">
              Founded in 2020, Memoriestore has been helping people celebrate life's special moments with stunning video
              invitations that capture the essence of every occasion.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  Explore Our Products
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                <Globe className="w-4 h-4 mr-2" />
                Our Journey
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                From Vision to Reality: The Memoriestore Story
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Memoriestore was born from a simple yet powerful idea: every celebration deserves an invitation as special as the event
                  itself. We noticed that traditional paper invitations were becoming outdated, while generic digital
                  invites lacked personality and charm.
                </p>
                <p>
                  Our founders, a team of passionate designers and developers, came together to create a platform that combines the
                  personal touch of custom design with the convenience of digital delivery. Today, we've helped over 10,000
                  customers create memorable invitations for their special occasions.
                </p>
                <p>
                  From intimate family gatherings to grand celebrations, Memoriestore has become the trusted choice for
                  people who want their invitations to make a lasting impression and create unforgettable memories.
                </p>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="relative z-10 w-full max-w-md">
                <div className="aspect-square rounded-full overflow-hidden shadow-2xl">
                  <Image
                    src="/Journey.png"
                    alt="Memoriestore Journey - From Vision to Reality"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700">Our Values</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
              The Principles That Drive Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do at Memoriestore and shape the experiences we create for our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="p-8 text-center">
                    <div className={`inline-flex items-center justify-center w-20 h-20 ${value.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-10 w-10" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-900">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-pink-100 text-pink-700">Our Team</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
              Meet the Visionaries
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate and talented people behind Memoriestore's success
            </p>
          </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
             {team.map((member, index) => (
               <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                 <CardContent className="p-6 sm:p-8 text-center">
                   {/* Circular Photo Container */}
                   <div className="relative mx-auto mb-6 sm:mb-8">
                     <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto relative">
                       <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full p-1">
                         <div className="w-full h-full rounded-full overflow-hidden bg-white">
                           <Image
                             src={member.image}
                             alt={member.name}
                             width={200}
                             height={200}
                             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                           />
                         </div>
                       </div>
                     </div>
                   </div>
                   
                   {/* Team Member Info */}
                   <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">{member.name}</h3>
                   <p className="text-purple-600 font-semibold text-base sm:text-lg mb-3 sm:mb-4">{member.role}</p>
                   <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">{member.description}</p>
                   
                   {/* Social Links */}
                   <div className="flex justify-center space-x-4">
                     <a href={member.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors p-2 hover:bg-gray-100 rounded-full">
                       <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                       </svg>
                     </a>
                     <a href={member.twitter} className="text-gray-400 hover:text-blue-400 transition-colors p-2 hover:bg-gray-100 rounded-full">
                       <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                       </svg>
                     </a>
                   </div>
                 </CardContent>
               </Card>
             ))}
           </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Memoriestore by Numbers
            </h2>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Our impact in numbers - every digit represents a story of celebration and joy
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center group">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-8 w-8 ${stat.color.replace('text-', 'text-white')}`} />
                  </div>
                  <div className="text-4xl sm:text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-purple-100 text-lg">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
              Ready to Create Your Perfect Invitation?
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join thousands of happy customers who trust Memoriestore for their celebration needs. 
              Start creating beautiful memories today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Start Creating
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
