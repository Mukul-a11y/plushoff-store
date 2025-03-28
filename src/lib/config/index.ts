import Medusa from "@medusajs/medusa-js"

// Initialize the Medusa client
export const medusaClient = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000",
  maxRetries: 3,
}); 