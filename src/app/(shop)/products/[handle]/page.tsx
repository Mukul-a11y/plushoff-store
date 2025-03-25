"use client"

import { useEffect, useState } from "react"
import { medusaClient } from "@/lib/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import Image from "next/image"
import { useCart } from "@/lib/context/cart"
import { formatINR } from "@/lib/utils"

interface ProductPageProps {
  params: {
    handle: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<PricedProduct | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<string>("")
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { products } = await medusaClient.products.list({ handle: params.handle })
        if (products[0]) {
          setProduct(products[0])
          if (products[0].variants[0]?.id) {
            setSelectedVariant(products[0].variants[0].id)
          }
        }
      } catch (error) {
        console.error("Failed to fetch product:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [params.handle])

  const handleAddToCart = async () => {
    if (!selectedVariant) return
    try {
      await addItem(selectedVariant, quantity)
      // You might want to show a success message here
    } catch (error) {
      console.error("Failed to add item to cart:", error)
      // You might want to show an error message here
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Product not found</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
          {product.thumbnail && (
            <Image
              src={product.thumbnail || ""}
              alt={product.title || "Product image"}
              width={800}
              height={800}
              className="object-cover w-full h-full"
            />
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-serif">{product.title}</h1>
            <p className="text-gray-500 mt-2">{product.collection?.title}</p>
          </div>

          <div>
            <p className="text-2xl font-medium">
              {formatINR(product.variants.find(v => v.id === selectedVariant)?.prices[0]?.amount || 0)}
            </p>
          </div>

          <div>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Variant Selection */}
          {product.variants.length > 1 && (
            <div>
              <label className="block text-sm font-medium mb-2">Select Variant</label>
              <select
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
                className="w-full border rounded-lg p-2"
              >
                {product.variants.map((variant) => (
                  <option key={variant.id} value={variant.id}>
                    {variant.title} - {formatINR(variant.prices[0]?.amount || 0)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Quantity Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full border rounded-lg p-2"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
} 