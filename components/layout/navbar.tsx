"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ShoppingCart, User, LogOut, Settings, Package, Users, BarChart3, Heart, Search } from "lucide-react"

export default function Navbar() {
  const { user, logout, loading: authLoading } = useAuth()
  const { items: cartItems = [], mounted: cartMounted } = useCart()
  const { wishlistItems = [] } = useWishlist()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setShowMobileSearch(false)
      setIsMenuOpen(false)
    }
  }

  const handleMobileSearchClick = () => {
    setShowMobileSearch(true)
    setIsMenuOpen(false)
    // Focus the search input after a short delay
    setTimeout(() => {
      const searchInput = document.getElementById('mobile-search-input')
      if (searchInput) {
        searchInput.focus()
      }
    }, 100)
  }

  // Prevent hydration mismatch by not rendering until mounted and auth is loaded
  if (!mounted || authLoading) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile: Hamburger Menu */}
            <button className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
            </button>

            {/* Logo - Centered on mobile, left on desktop */}
            <div className="flex-1 flex justify-center md:justify-start">
              <Link href="/" className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              </Link>
            </div>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <div className="w-full bg-gray-200 rounded animate-pulse h-10"></div>
            </div>

            {/* Right side - skeleton */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="hidden md:block w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="hidden md:block w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile: Hamburger Menu */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo - Centered on mobile, left on desktop */}
            <div className="flex-1 flex justify-center md:justify-start">
              <Link href="/" className="flex items-center">
                <Image
                  src="/Logo.png"
                  alt="Memoriestore"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Search Bar - Hidden on mobile, visible on desktop */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="w-full flex">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pr-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 p-0 bg-black hover:bg-gray-800 text-white rounded"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>

            {/* Right side - Icons and buttons */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Wishlist Icon - Mobile style */}
              <Link href="/wishlist" className="p-2 text-gray-600 hover:text-gray-900 transition-colors relative">
                <div className="w-8 h-8 border border-pink-200 rounded-full flex items-center justify-center bg-white">
                  <Heart className="w-4 h-4 text-pink-500" />
                  {mounted && wishlistItems && wishlistItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                  )}
                </div>
              </Link>

              {/* Cart Icon - Mobile style */}
              <Link href="/cart" className="p-2 text-gray-600 hover:text-gray-900 transition-colors relative">
                <div className="w-8 h-8 border border-blue-200 rounded-full flex items-center justify-center bg-white">
                  <ShoppingCart className="w-4 h-4 text-blue-500" />
                  {mounted && cartMounted && cartItems && cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </div>
              </Link>

              {/* Mobile Search Icon */}
              <button
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={handleMobileSearchClick}
              >
                <div className="w-8 h-8 border border-gray-200 rounded-full flex items-center justify-center bg-white">
                  <Search className="w-4 h-4 text-gray-600" />
                </div>
              </button>

              {/* Desktop: User Menu or Auth Buttons */}
              <div className="hidden md:block">
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.image} alt={user.name} />
                          <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm">
                            {getUserInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user.name}</p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/orders" className="flex items-center">
                          <Package className="mr-2 h-4 w-4" />
                          My Orders
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/wishlist" className="flex items-center">
                          <Heart className="mr-2 h-4 w-4" />
                          My Wishlist
                        </Link>
                      </DropdownMenuItem>
                      {user.role === 'admin' && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href="/admin" className="flex items-center">
                              <BarChart3 className="mr-2 h-4 w-4" />
                              Admin Dashboard
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/admin/products" className="flex items-center">
                              <Package className="mr-2 h-4 w-4" />
                              Manage Products
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/admin/orders" className="flex items-center">
                              <Package className="mr-2 h-4 w-4" />
                              Manage Orders
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/admin/users" className="flex items-center">
                              <Users className="mr-2 h-4 w-4" />
                              Manage Users
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout} className="text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Link href="/login">
                      <span className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
                        Login
                      </span>
                    </Link>
                    <Link href="/signup">
                      <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white rounded-full">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile: Auth Buttons */}
              {!user && (
                <div className="md:hidden flex items-center space-x-2">
                  <Link href="/login">
                    <span className="text-gray-700 hover:text-gray-900 transition-colors font-medium text-sm">
                      Login
                    </span>
                  </Link>
                  <Link href="/signup">
                    <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white rounded-full text-sm px-3 py-1">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile: User Avatar */}
              {user && (
                <div className="md:hidden">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.image} alt={user.name} />
                          <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm">
                            {getUserInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user.name}</p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/orders" className="flex items-center">
                          <Package className="mr-2 h-4 w-4" />
                          My Orders
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/wishlist" className="flex items-center">
                          <Heart className="mr-2 h-4 w-4" />
                          My Wishlist
                        </Link>
                      </DropdownMenuItem>
                      {user.role === 'admin' && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href="/admin" className="flex items-center">
                              <BarChart3 className="mr-2 h-4 w-4" />
                              Admin Dashboard
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/admin/products" className="flex items-center">
                              <Package className="mr-2 h-4 w-4" />
                              Manage Products
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/admin/orders" className="flex items-center">
                              <Package className="mr-2 h-4 w-4" />
                              Manage Orders
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/admin/users" className="flex items-center">
                              <Users className="mr-2 h-4 w-4" />
                              Manage Users
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout} className="text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              {/* Mobile Search Bar */}
              <div className="px-4 pb-4">
                <form onSubmit={handleSearch} className="flex">
                  <div className="relative flex-1">
                    <Input
                      id="mobile-search-input"
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pr-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                    <Button
                      type="submit"
                      size="sm"
                      className="absolute right-1 top-1 h-8 w-8 p-0 bg-black hover:bg-gray-800 text-white rounded"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </div>

                          <div className="flex flex-col space-y-2">
              <Link href="/shop" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 font-semibold">
                Shop All Products
              </Link>
              <div className="border-t border-gray-200 my-2"></div>
              <Link href="/category/wedding" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2">
                Wedding
              </Link>
              <Link href="/category/birthday" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2">
                Birthday
              </Link>
              <Link href="/category/baby-shower" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2">
                Baby Shower
              </Link>
              <Link href="/category/house-party" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2">
                House Party
              </Link>
              <Link href="/category/invitations" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2">
                Invitations
              </Link>
              <Link href="/category/save-the-date" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2">
                Save the Date
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2">
                Contact
              </Link>
                {user && (
                  <>
                    <Link href="/wishlist" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2">
                      Wishlist ({mounted && wishlistItems ? wishlistItems.length : 0})
                    </Link>
                    <Link href="/cart" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2">
                      Cart ({mounted && cartMounted && cartItems ? cartItems.length : 0})
                    </Link>
                    <Link href="/profile" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2">
                      Profile
                    </Link>
                    <Link href="/orders" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2">
                      My Orders
                    </Link>
                    {user.role === 'admin' && (
                      <>
                        <Link href="/admin" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2">
                          Admin Dashboard
                        </Link>
                        <Link href="/admin/products" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2">
                          Manage Products
                        </Link>
                        <Link href="/admin/orders" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2">
                          Manage Orders
                        </Link>
                        <Link href="/admin/users" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2">
                          Manage Users
                        </Link>
                      </>
                    )}
                    <button
                      onClick={logout}
                      className="text-red-600 hover:text-red-700 transition-colors px-4 py-2 text-left"
                    >
                      Log out
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex items-center justify-between p-4 border-b">
            <button
              onClick={() => setShowMobileSearch(false)}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-lg font-semibold text-gray-900">Search Products</h2>
            <div className="w-10"></div> {/* Spacer for centering */}
          </div>
          
          <div className="p-4">
            <form onSubmit={handleSearch} className="flex">
              <div className="relative flex-1">
                <Input
                  id="mobile-search-input"
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-lg"
                  autoFocus
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-1 top-1 h-10 w-10 p-0 bg-black hover:bg-gray-800 text-white rounded"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
