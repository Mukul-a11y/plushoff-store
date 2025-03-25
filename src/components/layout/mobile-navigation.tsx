"use client"

import Link from "next/link"
import { Heart, History, User, Home } from "lucide-react"

export function MobileNavigation() {
  return (
    <nav className="fixed md:hidden bottom-0 left-0 right-0 bg-white border-t py-2">
      <div className="flex justify-around items-center">
        <Link href="/" className="flex flex-col items-center">
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link href="/favorites" className="flex flex-col items-center">
          <Heart className="h-6 w-6" />
          <span className="text-xs mt-1">Favorites</span>
        </Link>
        <Link href="/history" className="flex flex-col items-center">
          <History className="h-6 w-6" />
          <span className="text-xs mt-1">History</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center">
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Following</span>
        </Link>
      </div>
    </nav>
  )
} 