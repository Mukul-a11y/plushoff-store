"use client"

import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-serif mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your order. We'll send you a confirmation email with your order details.
        </p>
        <Link 
          href="/" 
          className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
} 