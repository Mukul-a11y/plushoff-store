import Medusa from "@medusajs/medusa-js"
import { QueryClient } from "@tanstack/react-query"

// Initialize the Medusa client
const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

export const medusaClient = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })

// Initialize React Query client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
      retry: 3,
    },
  },
}) 