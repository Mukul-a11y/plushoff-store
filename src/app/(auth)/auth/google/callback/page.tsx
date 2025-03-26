"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { handleGoogleCallback } from "@/lib/auth/google"

export default function GoogleCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const code = searchParams.get("code")
    if (!code) {
      setError("No authorization code received")
      return
    }

    handleGoogleCallback(code)
      .then(() => {
        router.push("/account")
      })
      .catch((err) => {
        console.error("Failed to handle Google callback:", err)
        setError("Failed to complete authentication")
      })
  }, [searchParams, router])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-medium text-red-600 mb-2">Authentication Failed</h2>
          <p className="text-gray-500">{error}</p>
          <button
            onClick={() => router.push("/login")}
            className="mt-4 text-black hover:underline"
          >
            Return to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
        <p className="mt-4 text-gray-500">Completing authentication...</p>
      </div>
    </div>
  )
} 