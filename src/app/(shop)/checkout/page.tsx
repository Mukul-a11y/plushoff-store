"use client"

import { useCart } from "@/lib/context/cart"
import { formatINR } from "@/lib/utils"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function CheckoutPage() {
  const { cart } = useCart()
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!cart?.items?.length) {
    router.push("/cart")
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would integrate with your payment gateway
      // For now, we'll just simulate a successful checkout
      await new Promise(resolve => setTimeout(resolve, 2000))
      router.push("/checkout/success")
    } catch (error) {
      console.error("Checkout failed:", error)
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-serif mb-8">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded-lg p-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full border rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full border rounded-lg p-2"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded-lg p-2"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded-lg p-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full border rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full border rounded-lg p-2"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="pincode" className="block text-sm font-medium mb-1">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded-lg p-2"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400"
            >
              {isSubmitting ? "Processing..." : "Place Order"}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>

            <div className="space-y-4">
              {cart.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 flex-shrink-0">
                    {item.thumbnail && (
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        width={64}
                        height={64}
                        className="object-cover rounded-md"
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      {item.variant.title} × {item.quantity}
                    </p>
                    <p className="text-sm font-medium">
                      {formatINR(item.unit_price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatINR(cart.subtotal || 0)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              {(cart.discount_total || 0) > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>- {formatINR(cart.discount_total || 0)}</span>
                </div>
              )}
              {(cart.tax_total || 0) > 0 && (
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>{formatINR(cart.tax_total || 0)}</span>
                </div>
              )}
              <div className="flex justify-between font-medium text-lg pt-2">
                <span>Total</span>
                <span>{formatINR(cart.total || 0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 