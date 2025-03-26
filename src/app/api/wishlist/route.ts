import { NextRequest, NextResponse } from "next/server";
import { medusaClient } from "@/lib/config";

export async function GET(req: NextRequest) {
  try {
    const { data: { customer } } = await medusaClient.customers.retrieve();
    if (!customer) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { wishlist } = await medusaClient.client.request("GET", `/store/customers/${customer.id}/wishlist`);
    return NextResponse.json({ wishlist });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return NextResponse.json(
      { error: "Failed to fetch wishlist" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { productId } = await req.json();
    const { data: { customer } } = await medusaClient.customers.retrieve();
    
    if (!customer) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await medusaClient.client.request("POST", `/store/customers/${customer.id}/wishlist`, {
      product_id: productId
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return NextResponse.json(
      { error: "Failed to add to wishlist" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { productId } = await req.json();
    const { data: { customer } } = await medusaClient.customers.retrieve();
    
    if (!customer) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await medusaClient.client.request("DELETE", `/store/customers/${customer.id}/wishlist/${productId}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return NextResponse.json(
      { error: "Failed to remove from wishlist" },
      { status: 500 }
    );
  }
} 