"use client"

import Link from "next/link"
import { ShoppingCart, Search, Menu, X } from "lucide-react"
import { useCart } from "@/lib/cart"
import { useState } from "react"

const navigation = [
  { name: "Products", href: "/products" },
  { name: "Categories", href: "/categories" },
  { name: "Deals", href: "/deals" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items } = useCart()
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Plushoff
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/cart"
              className="flex items-center text-base font-medium text-gray-500 hover:text-gray-900"
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="ml-2">{itemCount}</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/cart"
              className="flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="ml-2">{itemCount}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
} 