"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { medusaClient } from "@/lib/medusa"
import { Search, ShoppingBag, User, Menu } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      await medusaClient.customers.retrieve()
      setIsAuthenticated(true)
    } catch {
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
      setShowSearch(false)
      setSearchQuery("")
    }
  }

  return (
    <header className="border-b bg-white/80 backdrop-blur-xl sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 text-2xl font-serif">
            Plushoff
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button 
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            href="/products"
            className={`text-sm font-semibold leading-6 ${
              pathname === "/products" ? "text-black" : "text-gray-900"
            }`}
          >
            Products
          </Link>
          <Link
            href="/categories"
            className={`text-sm font-semibold leading-6 ${
              pathname === "/categories" ? "text-black" : "text-gray-900"
            }`}
          >
            Categories
          </Link>
          <Link
            href="/about"
            className={`text-sm font-semibold leading-6 ${
              pathname === "/about" ? "text-black" : "text-gray-900"
            }`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`text-sm font-semibold leading-6 ${
              pathname === "/contact" ? "text-black" : "text-gray-900"
            }`}
          >
            Contact
          </Link>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6 items-center">
          {!loading && (
            <>
              {/* Search toggle button */}
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className="text-gray-900 hover:text-gray-600"
              >
                <Search className="h-5 w-5" />
              </button>
              
              {/* Search input that appears when search button is clicked */}
              {showSearch && (
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-4 pr-10 py-2 border rounded-full"
                    autoFocus
                  />
                  <button 
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <Search className="h-4 w-4 text-gray-400" />
                  </button>
                </form>
              )}
              
              {/* Cart icon */}
              <Link href="/cart" className="text-gray-900 hover:text-gray-600">
                <ShoppingBag className="h-5 w-5" />
              </Link>
              
              {isAuthenticated ? (
                <Link href="/account" className="text-gray-900 hover:text-gray-600">
                  <User className="h-5 w-5" />
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="rounded-md bg-black px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
                >
                  Login/Signup
                </Link>
              )}
            </>
          )}
        </div>
        
        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white p-4 border-t border-gray-200 z-50">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Link
                href="/products"
                className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Products
              </Link>
              <Link
                href="/categories"
                className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Categories
              </Link>
              <Link
                href="/about"
                className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Contact
              </Link>
              
              <div className="mt-4 flex items-center gap-4">
                <Link href="/cart" className="text-gray-900">
                  <ShoppingBag className="h-5 w-5" />
                </Link>
                
                {isAuthenticated ? (
                  <Link href="/account" className="text-gray-900">
                    <User className="h-5 w-5" />
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="w-full rounded-md bg-black px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 flex justify-center"
                  >
                    Login/Signup
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}