"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
        <p className="text-gray-500 mb-8">
          Your order has been successfully placed. We will send you an email with
          your order details and tracking information.
        </p>
        <div className="space-x-4">
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
          <Link href="/orders">
            <Button variant="outline">View Orders</Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 