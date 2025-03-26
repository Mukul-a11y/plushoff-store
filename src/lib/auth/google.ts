import { medusaClient } from "@/lib/medusa"

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""
const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || ""

export async function signInWithGoogle() {
  try {
    // Construct Google OAuth URL
    const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth")
    googleAuthUrl.searchParams.append("client_id", GOOGLE_CLIENT_ID)
    googleAuthUrl.searchParams.append("redirect_uri", GOOGLE_REDIRECT_URI)
    googleAuthUrl.searchParams.append("response_type", "code")
    googleAuthUrl.searchParams.append("scope", "email profile")
    googleAuthUrl.searchParams.append("prompt", "select_account")
    
    // Redirect to Google login
    window.location.href = googleAuthUrl.toString()
  } catch (error) {
    console.error("Failed to initiate Google sign in:", error)
    throw error
  }
}

export async function handleGoogleCallback(code: string) {
  try {
    // Exchange the code for Google user info
    const response = await fetch("/api/auth/google/callback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    })

    if (!response.ok) {
      throw new Error("Failed to authenticate with Google")
    }

    const data = await response.json()
    const generatedPassword = Math.random().toString(36).slice(-8)

    // Create or authenticate customer in Medusa
    const { customer } = await medusaClient.customers.create({
      email: data.email,
      first_name: data.given_name,
      last_name: data.family_name,
      password: generatedPassword,
    })

    // Log the customer in
    await medusaClient.auth.authenticate({
      email: customer.email,
      password: generatedPassword,
    })

    return customer
  } catch (error) {
    console.error("Failed to complete Google sign in:", error)
    throw error
  }
} 