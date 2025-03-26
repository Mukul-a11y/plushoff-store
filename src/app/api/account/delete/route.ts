import { NextResponse } from "next/server"
import { medusaClient } from "@/lib/medusa"

export async function POST() {
  try {
    // Get current customer
    const { customer } = await medusaClient.auth.getSession()
    
    if (!customer) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    // Delete customer through Medusa admin API
    const response = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/admin/customers/${customer.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.MEDUSA_ADMIN_API_KEY}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to delete account")
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error deleting account:", error)
    return NextResponse.json(
      { error: "Failed to delete account" },
      { status: 500 }
    )
  }
} 