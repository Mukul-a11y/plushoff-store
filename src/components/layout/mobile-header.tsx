"use client"

import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function MobileHeader() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="md:hidden">
      <div className="sticky top-0 bg-gray-100 p-4">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white pl-10 pr-4 py-2 rounded-lg"
          />
        </form>
      </div>
    </header>
  )
} 