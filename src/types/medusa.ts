import type { Product as MedusaProductType } from "@medusajs/medusa-js"

export interface MedusaProduct {
  id: string
  title: string
  description: string
  thumbnail: string | null
  handle: string
  variants: MedusaVariant[]
}

export interface MedusaVariant {
  id: string
  title: string
  prices: {
    amount: number
  }[]
}

export interface MedusaProductResponse {
  product: MedusaProduct
} 