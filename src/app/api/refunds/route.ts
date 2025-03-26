import { NextRequest } from "next/server"
import { medusaClient } from "@/lib/config"
import { StoreCustomersRes } from "@medusajs/medusa"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const orderId = searchParams.get("orderId")

    // Get customer session
    const { data: { customer } } = await medusaClient.customers.retrieve()
    if (!customer) {
      return new Response("Unauthorized", { status: 401 })
    }

    // Get refunds for the order
    const { data: { refunds } } = await medusaClient.admin.refunds.list({
      order_id: orderId
    })

    return Response.json(refunds)
  } catch (error) {
    console.error("Error fetching refunds:", error)
    return new Response("Error fetching refunds", { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { order_id, return_id, amount, reason, note } = await req.json()

    // Validate required fields
    if (!order_id || !amount) {
      return new Response("Missing required fields", { status: 400 })
    }

    // Get customer session
    const { data: { customer } } = await medusaClient.customers.retrieve()
    if (!customer) {
      return new Response("Unauthorized", { status: 401 })
    }

    // Create refund
    const { data: { refund } } = await medusaClient.admin.refunds.create({
      order_id,
      return_id,
      amount,
      reason,
      note
    })

    return Response.json(refund)
  } catch (error) {
    console.error("Error creating refund:", error)
    return new Response("Error creating refund", { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { refund_id, status, note } = await req.json()

    if (!refund_id) {
      return new Response("Missing refund ID", { status: 400 })
    }

    // Get customer session
    const { data: { customer } } = await medusaClient.customers.retrieve()
    if (!customer) {
      return new Response("Unauthorized", { status: 401 })
    }

    // Update refund
    const { data: { refund } } = await medusaClient.admin.refunds.update(refund_id, {
      status,
      note
    })

    return Response.json(refund)
  } catch (error) {
    console.error("Error updating refund:", error)
    return new Response("Error updating refund", { status: 500 })
  }
} 