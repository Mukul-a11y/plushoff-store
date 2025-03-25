"use client"

import { medusaClient } from "@/lib/medusa"
import { Cart } from "@medusajs/medusa"
import { createContext, useCallback, useContext, useEffect, useState } from "react"

type SimplifiedCart = Omit<Cart, "refundable_amount" | "refunded_total" | "beforeInsert" | "beforeUpdate" | "afterLoad">

interface CartContextValue {
  cart?: SimplifiedCart
  isLoading: boolean
  setCart: (cart: SimplifiedCart) => void
  addItem: (variantId: string, quantity: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  updateItem: (lineId: string, quantity: number) => Promise<void>
}

export const CartContext = createContext<CartContextValue>({
  isLoading: false,
  setCart: () => {},
  addItem: async () => {},
  removeItem: async () => {},
  updateItem: async () => {},
})

interface CartProviderProps {
  children: React.ReactNode
}

const CART_ID_KEY = "cart_id"

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<SimplifiedCart>()
  const [isLoading, setIsLoading] = useState(false)

  const createCart = useCallback(async () => {
    const { cart } = await medusaClient.carts.create()
    localStorage.setItem(CART_ID_KEY, cart.id)
    setCart(cart as SimplifiedCart)
    return cart
  }, [])

  const getCart = useCallback(async () => {
    const cartId = localStorage.getItem(CART_ID_KEY)
    if (!cartId) return null

    try {
      const { cart } = await medusaClient.carts.retrieve(cartId)
      setCart(cart as SimplifiedCart)
      return cart
    } catch (error) {
      localStorage.removeItem(CART_ID_KEY)
      return null
    }
  }, [])

  useEffect(() => {
    const initializeCart = async () => {
      const existingCart = await getCart()
      if (!existingCart) {
        await createCart()
      }
    }

    initializeCart()
  }, [createCart, getCart])

  const addItem = useCallback(async (variantId: string, quantity: number) => {
    if (!cart?.id) return

    setIsLoading(true)
    try {
      const { cart: updatedCart } = await medusaClient.carts.lineItems.create(cart.id, {
        variant_id: variantId,
        quantity,
      })
      setCart(updatedCart as SimplifiedCart)
    } catch (error) {
      console.error("Failed to add item to cart:", error)
    } finally {
      setIsLoading(false)
    }
  }, [cart])

  const removeItem = useCallback(async (lineId: string) => {
    if (!cart?.id) return

    setIsLoading(true)
    try {
      const { cart: updatedCart } = await medusaClient.carts.lineItems.delete(cart.id, lineId)
      setCart(updatedCart as SimplifiedCart)
    } catch (error) {
      console.error("Failed to remove item from cart:", error)
    } finally {
      setIsLoading(false)
    }
  }, [cart])

  const updateItem = useCallback(async (lineId: string, quantity: number) => {
    if (!cart?.id) return

    setIsLoading(true)
    try {
      const { cart: updatedCart } = await medusaClient.carts.lineItems.update(cart.id, lineId, {
        quantity,
      })
      setCart(updatedCart as SimplifiedCart)
    } catch (error) {
      console.error("Failed to update item quantity:", error)
    } finally {
      setIsLoading(false)
    }
  }, [cart])

  return (
    <CartContext.Provider value={{ cart, isLoading, setCart, addItem, removeItem, updateItem }}>
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