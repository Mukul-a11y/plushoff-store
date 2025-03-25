"use client"

import { useCart } from "@/lib/context/cart"
import { formatINR } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"

export default function CartPage() {
  const { cart, updateItem, removeItem, isLoading } = useCart()

  const updateQuantity = async (lineId: string, quantity: number) => {
    if (quantity === 0) {
      await removeItem(lineId)
    } else {
      await updateItem(lineId, quantity)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-serif mb-8">Shopping Cart</h1>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-32 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!cart?.items?.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-serif mb-8">Shopping Cart</h1>
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link href="/products" className="text-black underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-serif mb-8">Shopping Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div key={item.id} className="flex gap-4 border rounded-lg p-4">
              {/* Product Image */}
              <div className="w-24 h-24 flex-shrink-0">
                {item.thumbnail && (
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={96}
                    height={96}
                    className="object-cover rounded-md"
                  />
                )}
              </div>

              {/* Product Info */}
              <div className="flex-grow">
                <Link href={`/products/${item.variant.product.handle}`} className="hover:underline">
                  <h3 className="font-medium">{item.title}</h3>
                </Link>
                <p className="text-sm text-gray-500">{item.variant.title}</p>
                <p className="text-sm font-medium mt-1">{formatINR(item.unit_price)}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-1 hover:bg-gray-100 rounded ml-2"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-6 h-fit">
          <h2 className="text-lg font-medium mb-4">Order Summary</h2>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatINR(cart.subtotal || 0)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            {(cart.discount_total || 0) > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>- {formatINR(cart.discount_total || 0)}</span>
              </div>
            )}
            {(cart.tax_total || 0) > 0 && (
              <div className="flex justify-between">
                <span>Tax</span>
                <span>{formatINR(cart.tax_total || 0)}</span>
              </div>
            )}
          </div>

          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{formatINR(cart.total || 0)}</span>
            </div>
          </div>

          <button className="w-full bg-black text-white py-3 rounded-lg mt-6 hover:bg-gray-800 transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
} 