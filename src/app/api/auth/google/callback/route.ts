import { NextResponse } from "next/server"

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || ""
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || ""
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || ""

export async function POST(request: Request) {
  try {
    const { code } = await request.json()

    // Exchange code for access token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error("Failed to exchange code for token")
    }

    const { access_token } = await tokenResponse.json()

    // Get user info using access token
    const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    if (!userInfoResponse.ok) {
      throw new Error("Failed to get user info")
    }

    const userInfo = await userInfoResponse.json()

    return NextResponse.json(userInfo)
  } catch (error) {
    console.error("Google OAuth callback error:", error)
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    )
  }
} 