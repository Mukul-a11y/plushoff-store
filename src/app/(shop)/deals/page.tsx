"use client"

import { useEffect, useState } from "react"
import { medusaClient } from "@/lib/medusa"
import { MedusaProduct } from "@/types/medusa"
import { useCart } from "@/lib/cart"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function DealsPage() {
  const [products, setProducts] = useState<MedusaProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const { products } = await medusaClient.products.list({ limit: 100 })
      setProducts(products as MedusaProduct[])
    } catch (error) {
      console.error("Failed to fetch products:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const discountedProducts = products.filter((product) => {
    const price = product.variants[0]?.prices[0]?.amount / 100 || 0
    return price < 100
  })

  const handleAddToCart = async (productId: string, variantId: string) => {
    try {
      await addItem(productId, variantId, 1)
    } catch (error) {
      console.error("Failed to add item to cart:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square w-full rounded-lg bg-gray-200" />
              <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />
              <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-4 text-4xl font-bold">Special Deals</h1>
        <p className="mb-8 text-lg text-gray-600">
          Discover amazing products at unbeatable prices. Limited time offers!
        </p>
      </div>

      {discountedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {discountedProducts.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-lg border bg-white p-4 transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                {product.thumbnail && (
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                )}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{product.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                {product.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-primary">
                  ${product.variants[0]?.prices[0]?.amount / 100 || 0}
                </span>
                <Button
                  onClick={() => handleAddToCart(product.id, product.variants[0]?.id || "")}
                  disabled={!product.variants[0]?.id}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-lg text-gray-600">
            No deals available at the moment. Check back later for amazing offers!
          </p>
        </div>
      )}
    </div>
  )
} 