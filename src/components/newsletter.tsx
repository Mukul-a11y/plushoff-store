"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: Implement newsletter subscription API call
      console.log("Subscribing email:", email)
      setIsSuccess(true)
      setEmail("")
    } catch (error) {
      console.error("Error subscribing to newsletter:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-8">
            Stay updated with the latest products, exclusive offers, and shopping
            tips. Join our community of savvy shoppers today!
          </p>

          {isSuccess ? (
            <div className="bg-green-50 text-green-700 p-4 rounded-lg flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <p>Thank you for subscribing to our newsletter!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="whitespace-nowrap"
              >
                {isLoading ? "Subscribing..." : "Subscribe Now"}
              </Button>
            </form>
          )}

          <p className="text-sm text-gray-500 mt-4">
            By subscribing, you agree to our{" "}
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>{" "}
            and consent to receive updates from our company.
          </p>
        </div>
      </div>
    </div>
  )
} 