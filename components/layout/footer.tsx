import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-pink-100 text-gray-900">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/Logo.png"
                alt="Memoriestore"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
            </div>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Create stunning video invitations for all your special occasions. Professional quality, easy
              customization, instant delivery with Memoriestore.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Categories</h3>
            <ul className="space-y-2 text-sm sm:text-base text-gray-600">
              <li>
                <Link href="/shop" className="hover:text-gray-900 transition-colors font-medium">
                  Shop All Products
                </Link>
              </li>
              <li>
                <Link href="/category/wedding" className="hover:text-gray-900 transition-colors">
                  Wedding
                </Link>
              </li>
              <li>
                <Link href="/category/birthday" className="hover:text-gray-900 transition-colors">
                  Birthday
                </Link>
              </li>
              <li>
                <Link href="/category/invitations" className="hover:text-gray-900 transition-colors">
                  Invitations Cards
                </Link>
              </li>
              <li>
                <Link href="/category/house-party" className="hover:text-gray-900 transition-colors">
                  House Party
                </Link>
              </li>
              <li>
                <Link href="/category/baby-shower" className="hover:text-gray-900 transition-colors">
                  Baby Shower
                </Link>
              </li>
              <li>
                <Link href="/category/save-the-date" className="hover:text-gray-900 transition-colors">
                  Save the Date
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Support</h3>
            <ul className="space-y-2 text-sm sm:text-base text-gray-600">
              <li>
                <Link href="/about" className="hover:text-gray-900 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-900 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gray-900 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gray-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gray-900 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Follow Us</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                KundalaHalli Gate, MarathaHalli<br />
                Bengaluru, Karnataka 560037<br />
                India
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors p-2 hover:bg-pink-200 rounded-lg">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors p-2 hover:bg-pink-200 rounded-lg">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors p-2 hover:bg-pink-200 rounded-lg">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors p-2 hover:bg-pink-200 rounded-lg">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                Get the latest updates and exclusive offers
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-pink-300 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Memoriestore. All rights reserved.</p>
          <p className="mt-1 text-xs">
            Made with ❤️ for your special moments
          </p>
        </div>
      </div>
    </footer>
  )
}
