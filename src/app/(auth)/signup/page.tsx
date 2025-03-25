"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { FcGoogle } from "react-icons/fc"
import { FaApple } from "react-icons/fa"

export default function SignupPage() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement signup logic
  }

  return (
    <main className="min-h-screen p-4 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full space-y-8">
        <h1 className="text-2xl font-semibold">Create an account</h1>
        <p className="text-gray-600 text-center">
          Enter your email to sign up for this app
        </p>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@domain.com"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800"
          >
            Continue
          </button>
        </form>

        <div className="w-full flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <div className="w-full space-y-3">
          <button className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg border hover:bg-gray-50">
            <FcGoogle size={20} />
            <span>Continue with Google</span>
          </button>
          <button className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg border hover:bg-gray-50">
            <FaApple size={20} />
            <span>Continue with Apple</span>
          </button>
        </div>

        <p className="text-sm text-gray-600 text-center">
          By clicking continue, you agree to our{" "}
          <Link href="/terms" className="underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </main>
  )
} 