"use client"

import { createContext, useContext, useState, useCallback } from "react"
import { medusaClient } from "./medusa"

interface CartItem {
  id: string
  title: string
  quantity: number
  price: number
  thumbnail: string | null
}

interface CartContextType {
  items: CartItem[]
  isLoading: boolean
  addItem: (productId: string, variantId: string, quantity: number) => Promise<void>
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const addItem = useCallback(async (productId: string, variantId: string, quantity: number) => {
    setIsLoading(true)
    try {
      const { product } = await medusaClient.products.retrieve(productId)
      const variant = product.variants.find((v) => v.id === variantId)
      if (!variant || !product.title) {
        throw new Error("Product or variant not found")
      }

      const title: string = product.title

      setItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === productId)
        if (existingItem) {
          return prevItems.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        }
        return [
          ...prevItems,
          {
            id: productId,
            title,
            quantity,
            price: variant.prices[0]?.amount / 100 || 0,
            thumbnail: product.thumbnail || null,
          },
        ]
      })
    } catch (error) {
      console.error("Failed to add item to cart:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  return (
    <CartContext.Provider
      value={{
        items,
        isLoading,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
} 