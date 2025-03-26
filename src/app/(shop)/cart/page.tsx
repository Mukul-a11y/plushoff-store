"use client"

import { useCart } from "@/lib/context/cart-context"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { formatPrice } from "@/lib/utils"

export default function CartPage() {
  const { cart, loading, removeItem, updateItem } = useCart()
  const [updating, setUpdating] = useState<string | null>(null)
  const router = useRouter()

  const handleQuantityChange = async (lineId: string, quantity: number) => {
    if (quantity < 1) return
    setUpdating(lineId)
    await updateItem(lineId, quantity)
    setUpdating(null)
  }

  const handleRemove = async (lineId: string) => {
    setUpdating(lineId)
    await removeItem(lineId)
    setUpdating(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    )
  }

  if (!cart?.items?.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-serif">Your cart is empty</h2>
        <p className="text-gray-600">Add some items to your cart to get started</p>
        <Link
          href="/products"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800"
        >
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-serif mb-8">Shopping Cart</h1>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {cart.items.map((item) => (
                <li key={item.id} className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-24 h-24 relative">
                      {item.thumbnail ? (
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          fill
                          className="object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded-md" />
                      )}
                    </div>

                    <div className="ml-6 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">
                          <Link href={`/products/${item.variant.product.handle}`} className="hover:underline">
                            {item.title}
                          </Link>
                        </h3>
                        <p className="text-lg font-medium text-gray-900">
                          {formatPrice(item.unit_price)} × {item.quantity} = {formatPrice(item.total)}
                        </p>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={updating === item.id}
                            className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            disabled={updating === item.id}
                            className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemove(item.id)}
                          disabled={updating === item.id}
                          className="text-sm text-red-600 hover:text-red-800 disabled:opacity-50"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="p-6 bg-gray-50">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>{formatPrice(cart.subtotal)}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Shipping</p>
                <p>{formatPrice(cart.shipping_total)}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Discount</p>
                <span>- {formatPrice(cart.discount_total)}</span>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Tax</p>
                <p>{formatPrice(cart.tax_total)}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total</p>
                <p>{formatPrice(cart.total)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6">
                <button
                  onClick={() => router.push("/checkout")}
                  className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800"
                >
                  Checkout
                </button>
              </div>
              <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                <p>
                  or{" "}
                  <Link href="/products" className="font-medium text-black hover:text-gray-800">
                    Continue Shopping
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 