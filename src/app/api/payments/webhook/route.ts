import { NextRequest } from "next/server"
import crypto from "crypto"

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get("x-razorpay-signature")

    if (!signature) {
      return new Response("Missing signature", { status: 400 })
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest("hex")

    if (signature !== expectedSignature) {
      return new Response("Invalid signature", { status: 400 })
    }

    const event = JSON.parse(body)

    // Forward webhook to Medusa backend
    const response = await fetch(`${process.env.MEDUSA_BACKEND_URL}/store/razorpay/webhook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-razorpay-signature": signature
      },
      body: JSON.stringify(event)
    })

    if (!response.ok) {
      throw new Error("Failed to forward webhook")
    }

    return new Response("OK", { status: 200 })
  } catch (error) {
    console.error("Webhook error:", error)
    return new Response("Webhook error", { status: 500 })
  }
} 