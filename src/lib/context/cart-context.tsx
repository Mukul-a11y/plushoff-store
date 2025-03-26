"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { medusaClient } from "@/lib/medusa"
import type { StoreCartsRes } from "@medusajs/medusa"

type Cart = StoreCartsRes["cart"]

interface CartContextType {
  cart: Cart | null
  addItem: (variantId: string, quantity: number) => Promise<void>
  removeItem: (lineItemId: string) => Promise<void>
  updateItem: (lineItemId: string, quantity: number) => Promise<void>
  loading: boolean
  error: string | null
}

const CartContext = createContext<CartContextType>({
  cart: null,
  addItem: async () => {},
  removeItem: async () => {},
  updateItem: async () => {},
  loading: false,
  error: null
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initCart = async () => {
      const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null

      try {
        if (cartId) {
          const { cart } = await medusaClient.carts.retrieve(cartId)
          setCart(cart)
        } else {
          const { cart } = await medusaClient.carts.create()
          setCart(cart)
          localStorage.setItem('cartId', cart.id)
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to initialize cart')
        console.error('Failed to initialize cart:', error)
        localStorage.removeItem('cartId')
      }
    }

    initCart()
  }, [])

  const addItem = async (variantId: string, quantity: number) => {
    if (!cart?.id) return

    setLoading(true)
    setError(null)

    try {
      const { cart: updatedCart } = await medusaClient.carts.lineItems.create(cart.id, {
        variant_id: variantId,
        quantity
      })
      setCart(updatedCart)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to add item to cart')
      console.error('Failed to add item to cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const removeItem = async (lineItemId: string) => {
    if (!cart?.id) return

    setLoading(true)
    setError(null)

    try {
      const { cart: updatedCart } = await medusaClient.carts.lineItems.delete(cart.id, lineItemId)
      setCart(updatedCart)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to remove item from cart')
      console.error('Failed to remove item from cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateItem = async (lineItemId: string, quantity: number) => {
    if (!cart?.id) return

    setLoading(true)
    setError(null)

    try {
      const { cart: updatedCart } = await medusaClient.carts.lineItems.update(cart.id, lineItemId, {
        quantity
      })
      setCart(updatedCart)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update item quantity')
      console.error('Failed to update item quantity:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateItem, loading, error }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 