"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

interface Order {
  id: string
  date: string
  status: "pending" | "processing" | "shipped" | "delivered"
  items: {
    id: string
    title: string
    quantity: number
    price: number
    thumbnail: string | null
  }[]
  total: number
}

export default function OrdersPage() {
  const [email, setEmail] = useState("")
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // TODO: Implement order fetching logic
      // For now, we'll use mock data
      const mockOrders: Order[] = [
        {
          id: "1",
          date: "2024-03-15",
          status: "delivered",
          items: [
            {
              id: "1",
              title: "Product 1",
              quantity: 2,
              price: 29.99,
              thumbnail: null,
            },
            {
              id: "2",
              title: "Product 2",
              quantity: 1,
              price: 49.99,
              thumbnail: null,
            },
          ],
          total: 109.97,
        },
        {
          id: "2",
          date: "2024-03-10",
          status: "shipped",
          items: [
            {
              id: "3",
              title: "Product 3",
              quantity: 1,
              price: 79.99,
              thumbnail: null,
            },
          ],
          total: 79.99,
        },
      ]
      setOrders(mockOrders)
    } catch (error) {
      console.error("Failed to fetch orders:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Order History</h1>

      <form onSubmit={handleSubmit} className="max-w-md mb-8">
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "View Orders"}
          </Button>
        </div>
      </form>

      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-6 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">
                    Order #{order.id}
                  </p>
                  <p className="text-sm text-gray-500">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4"
                  >
                    {item.thumbnail && (
                      <div className="relative h-16 w-16">
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          No orders found. Please enter your email to view your order history.
        </p>
      )}
    </div>
  )
} 