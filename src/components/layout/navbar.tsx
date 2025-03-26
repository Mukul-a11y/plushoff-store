"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { medusaClient } from "@/lib/medusa"
import { signOut } from "next-auth/react"

export default function Navbar() {
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

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

  const handleLogout = async () => {
    try {
      await signOut({
        redirect: true,
        callbackUrl: '/'
      });
    } catch {
      console.error('Failed to sign out');
    }
  }

  return (
    <header className="border-b bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 text-2xl font-serif">
            Plushoff
          </Link>
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

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6">
          {!loading && (
            <>
              {isAuthenticated ? (
                <>
                  <Link
                    href="/account"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Account
                  </Link>
                  <Link
                    href="/cart"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Cart
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="text-sm font-semibold leading-6 px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  )
} 