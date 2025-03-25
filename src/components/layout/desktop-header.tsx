"use client"

import Link from "next/link"
import { Search, Heart, ShoppingBag, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function DesktopHeader() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="hidden md:block border-b">
      <div className="container mx-auto px-4">
        <div className="h-24 flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif">
            Plushoff
          </Link>
          
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/new-arrivals" className="hover:text-gray-600">New Arrivals</Link>
            <Link href="/best-sellers" className="hover:text-gray-600">Best Sellers</Link>
            <Link href="/categories" className="hover:text-gray-600">Categories</Link>
            <Link href="/sale" className="hover:text-gray-600">Sale</Link>
          </nav>

          <div className="flex items-center gap-6">
            <form onSubmit={handleSearch} className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-full"
              />
            </form>
            <Link href="/favorites" className="hover:text-gray-600">
              <Heart className="h-6 w-6" />
            </Link>
            <Link href="/cart" className="hover:text-gray-600">
              <ShoppingBag className="h-6 w-6" />
            </Link>
            <Link href="/account" className="hover:text-gray-600">
              <User className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
} 