"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { formatPrice } from "@/lib/utils"

interface OrderItem {
  id: string;
  title: string;
  quantity: number;
  price: number;
  image?: string;
  thumbnail?: string;
  variant: {
    title: string;
  };
  unit_price: number;
}

interface ShippingAddress {
  first_name: string;
  last_name: string;
  address_1: string;
  address_2?: string;
  city: string;
  postal_code: string;
  country: string;
  phone?: string;
}

interface Order {
  id: string;
  display_id: string;
  items: OrderItem[];
  total: number;
  subtotal: number;
  shipping_total: number;
  discount_total: number;
  tax_total: number;
  status: string;
  shipping_address?: ShippingAddress;
  created_at: string;
}

interface OrderConfirmationPageProps {
  params: {
    id: string
  }
}

export default function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order');
        }
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Failed to load order details');
        }
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">Order Not Found</h2>
          <p className="text-gray-600 mb-8">{error || 'Order not found'}</p>
          <button
            onClick={() => router.push("/orders")}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            View All Orders
          </button>
        </div>
      </div>
    )
  }

  const shippingAddress = order.shipping_address;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Order Header */}
          <div className="border-b border-gray-200 px-6 py-4">
            <h1 className="text-2xl font-medium text-gray-900">Order Confirmation</h1>
            <p className="mt-2 text-sm text-gray-600">
              Order #{order.display_id} • Placed on{" "}
              {new Date(order.created_at).toLocaleDateString()}
            </p>
          </div>

          {/* Order Items */}
          <div className="px-6 py-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Items</h2>
            <div className="space-y-4">
              {order.items.map((item: OrderItem) => (
                <div key={item.id} className="flex items-center">
                  <div className="h-20 w-20 flex-shrink-0">
                    {item.thumbnail && (
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="object-cover rounded"
                      />
                    )}
                  </div>
                  <div className="ml-6 flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {item.variant.title} × {item.quantity}
                    </p>
                  </div>
                  <div className="ml-6">
                    <p className="text-sm font-medium text-gray-900">
                      {formatPrice(item.unit_price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 px-6 py-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">{formatPrice(order.shipping_total)}</span>
              </div>
              {order.discount_total > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>- {formatPrice(order.discount_total)}</span>
                </div>
              )}
              {order.tax_total > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">{formatPrice(order.tax_total)}</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-2 flex justify-between">
                <span className="text-base font-medium text-gray-900">Total</span>
                <span className="text-base font-medium text-gray-900">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          {shippingAddress && (
            <div className="px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h2>
              <address className="text-sm text-gray-600 not-italic">
                {shippingAddress.first_name} {shippingAddress.last_name}
                <br />
                {shippingAddress.address_1}
                {shippingAddress.address_2 && (
                  <>
                    <br />
                    {shippingAddress.address_2}
                  </>
                )}
                <br />
                {shippingAddress.city}, {shippingAddress.postal_code}
                <br />
                {shippingAddress.country}
                {shippingAddress.phone && (
                  <>
                    <br />
                    Phone: {shippingAddress.phone}
                  </>
                )}
              </address>
            </div>
          )}

          {/* Continue Shopping Button */}
          <div className="border-t border-gray-200 px-6 py-4">
            <button
              onClick={() => router.push("/products")}
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 