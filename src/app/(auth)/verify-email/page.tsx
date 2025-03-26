"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { medusaClient } from "@/lib/medusa"

export default function VerifyEmailPage() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [verified, setVerified] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const email = searchParams.get("email")

  useEffect(() => {
    if (!token) {
      router.push("/account")
      return
    }

    const verifyEmail = async () => {
      try {
        await medusaClient.customers.resetPassword({
          token,
          email: email as string,
          password: ""  // We don't need to set a new password for email verification
        })
        setVerified(true)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("Failed to verify email. Please try again.")
        }
      } finally {
        setLoading(false)
      }
    }

    verifyEmail()
  }, [token, router, email])

  if (!token) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-serif text-gray-900">Email Verification</h2>
        </div>

        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
            <p className="mt-4 text-gray-600">Verifying your email...</p>
          </div>
        ) : verified ? (
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Success!</h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>Your email has been verified successfully.</p>
                </div>
                <div className="mt-4">
                  <div className="-mx-2 -my-1.5 flex">
                    <Link
                      href="/account"
                      className="bg-green-50 px-2 py-1.5 rounded-md text-sm font-medium text-green-800 hover:bg-green-100"
                    >
                      Go to account
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Verification failed</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
                <div className="mt-4">
                  <div className="-mx-2 -my-1.5 flex">
                    <Link
                      href="/account"
                      className="bg-red-50 px-2 py-1.5 rounded-md text-sm font-medium text-red-800 hover:bg-red-100"
                    >
                      Return to account
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 