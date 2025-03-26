import Medusa from "@medusajs/medusa-js"

// Initialize Medusa client
export const medusaClient = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000",
  maxRetries: 3,
})

// Site configuration
export const siteConfig = {
  name: "Plushoff",
  description: "Your one-stop shop for premium plush toys and collectibles",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og.jpg",
  links: {
    twitter: "https://twitter.com/plushoff",
    github: "https://github.com/plushoff",
    instagram: "https://instagram.com/plushoff",
  },
}

// API endpoints
export const apiConfig = {
  medusa: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000",
  razorpay: {
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET,
  },
}

// Feature flags
export const features = {
  reviews: true,
  wishlist: true,
  recommendations: true,
  analytics: true,
}

// Constants
export const constants = {
  itemsPerPage: 12,
  maxPrice: 10000,
  minPrice: 0,
  maxQuantity: 10,
  currency: {
    code: "INR",
    symbol: "₹",
  },
} 