"use client"

import { useEffect, useState } from "react"
import { medusaClient } from "@/lib/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/lib/context/cart"
import { formatINR } from "@/lib/utils"

export default function ProductsPage() {
  const [products, setProducts] = useState<PricedProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { products } = await medusaClient.products.list({ limit: 100 })
        setProducts(products)
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-serif mb-8">All Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {products.map((product) => (
          <Link 
            key={product.id} 
            href={`/products/${product.handle || product.id}`} 
            className="group"
          >
            <div className="space-y-2 md:space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                {product.thumbnail && (
                  <Image
                    src={product.thumbnail || ""}
                    alt={product.title || "Product image"}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              <div>
                <p className="text-sm md:text-base text-gray-500">{product.collection?.title}</p>
                <p className="font-medium md:text-lg">{product.title}</p>
                <p className="text-sm md:text-base">
                  {formatINR(product.variants[0]?.prices[0]?.amount || 0)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 