import { NextRequest } from "next/server"
import { medusaClient } from "@/lib/config"

export async function POST(req: NextRequest) {
  try {
    const { amount, currency, orderId, customerEmail, customerName } = await req.json()

    // Get customer session
    const { data: { customer } } = await medusaClient.customers.retrieve()
    if (!customer) {
      return new Response("Unauthorized", { status: 401 })
    }

    // Create Razorpay order
    const response = await fetch(`${process.env.MEDUSA_BACKEND_URL}/store/razorpay/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount,
        currency,
        order_id: orderId,
        customer_email: customerEmail,
        customer_name: customerName
      })
    })

    if (!response.ok) {
      throw new Error("Failed to create Razorpay order")
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error("Error creating payment:", error)
    return new Response("Error creating payment", { status: 500 })
  }
} 