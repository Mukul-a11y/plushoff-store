"use client"

import { useState } from "react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    
    // TODO: Implement newsletter subscription
    await new Promise(resolve => setTimeout(resolve, 1000))
    setStatus("success")
    setEmail("")
  }

  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-serif mb-4">Stay Updated</h2>
        <p className="text-gray-600 mb-8">
          Subscribe to our newsletter for exclusive offers and fashion updates
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="px-6 py-3 rounded-full flex-1 max-w-md border focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
        {status === "success" && (
          <p className="text-green-600 mt-4">Thank you for subscribing!</p>
        )}
        {status === "error" && (
          <p className="text-red-600 mt-4">Something went wrong. Please try again.</p>
        )}
      </div>
    </section>
  )
} 