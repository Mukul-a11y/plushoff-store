"use client"

import { useEffect, useState, useCallback } from "react"
import { medusaClient } from "@/lib/medusa"
import { useCart } from "@/lib/context/cart-context"
import Image from "next/image"
import { notFound } from "next/navigation"
import { formatPrice } from "@/lib/utils"
import type { 
  PricedProduct, 
  PricedVariant 
} from "@medusajs/medusa/dist/types/pricing"
import type { StoreGetProductsParams } from "@medusajs/medusa"

interface ProductPageProps {
  params: {
    handle: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { handle } = params
  const [product, setProduct] = useState<PricedProduct | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<PricedVariant | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { addItem } = useCart()

  const fetchProduct = useCallback(async () => {
    if (typeof handle !== 'string' || !handle) {
      setError('Invalid product handle')
      setLoading(false)
      return
    }

    try {
      const params: StoreGetProductsParams = {
        handle: handle
      }
      const { products } = await medusaClient.products.list(params)
      const product = products[0] as PricedProduct | undefined
      
      if (!product) {
        setError('Product not found')
        return
      }
      
      setProduct(product)
      const firstVariant = product.variants?.[0] as PricedVariant | undefined
      if (firstVariant) {
        setSelectedVariant(firstVariant)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch product')
      console.error('Error fetching product:', err)
    } finally {
      setLoading(false)
    }
  }, [handle])

  useEffect(() => {
    fetchProduct()
  }, [fetchProduct])

  const handleAddToCart = async () => {
    if (!selectedVariant?.id) {
      setError('Please select a variant')
      return
    }

    setAdding(true)
    setError(null)
    
    try {
      await addItem(selectedVariant.id, quantity)
    } catch (error) {
      console.error("Failed to add item to cart:", error)
      setError(error instanceof Error ? error.message : 'Failed to add item to cart')
    } finally {
      setAdding(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  if (!product) return notFound()

  const firstVariant = product.variants?.[0] as PricedVariant | undefined
  const firstVariantPrice = firstVariant?.prices?.[0]?.amount || 0
  const thumbnail = product.thumbnail || ""
  const title = product.title || "Untitled Product"
  const description = product.description || ""
  const productHandle = product.handle || ""

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col">
            <div className="aspect-w-1 aspect-h-1 w-full">
              {thumbnail ? (
                <Image
                  src={thumbnail}
                  alt={title}
                  width={600}
                  height={600}
                  className="w-full h-full object-center object-cover rounded-lg"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-lg" />
              )}
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-serif tracking-tight text-gray-900">{title}</h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">{formatPrice(firstVariantPrice)}</p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-gray-700 space-y-6">{description}</div>
            </div>

            <div className="mt-8">
              {product.variants.length > 1 && (
                <div className="mb-4">
                  <label htmlFor="variant" className="block text-sm font-medium text-gray-700">
                    Select Variant
                  </label>
                  <select
                    id="variant"
                    value={selectedVariant?.id}
                    onChange={(e) => {
                      const variant = product.variants.find(v => v.id === e.target.value) as PricedVariant | undefined
                      if (variant) {
                        setSelectedVariant(variant)
                      }
                    }}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md"
                  >
                    {product.variants.map((variant) => (
                      <option key={variant.id} value={variant.id}>
                        {variant.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mb-4">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={adding || !selectedVariant}
                className="mt-8 w-full bg-black border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:bg-gray-400"
              >
                {adding ? "Adding to cart..." : "Add to cart"}
              </button>
            </div>

            {/* Product metadata */}
            <div className="mt-10">
              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{productHandle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 