import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (amount: number | null | undefined): string => {
  if (amount === null || amount === undefined) return "₹0"
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date))
}

export function truncate(str: string, length: number): string {
  if (!str) return ""
  return str.length > length ? `${str.substring(0, length)}...` : str
}

export function generateOrderId(): string {
  return `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`
}

export function calculateDiscount(price: number, discount: number): number {
  return price - (price * discount) / 100
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[6-9]\d{9}$/
  return phoneRegex.test(phone)
}

export function isValidPincode(pincode: string): boolean {
  const pincodeRegex = /^[1-9][0-9]{5}$/
  return pincodeRegex.test(pincode)
} 