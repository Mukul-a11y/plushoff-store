import { NextRequest, NextResponse } from "next/server";
import { medusaClient } from "@/lib/config";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const { reviews } = await medusaClient.client.request("GET", `/store/products/${productId}/reviews`);
    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { productId, rating, comment } = await req.json();
    const { data: { customer } } = await medusaClient.customers.retrieve();
    
    if (!customer) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!productId || !rating) {
      return NextResponse.json(
        { error: "Product ID and rating are required" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    await medusaClient.client.request("POST", `/store/products/${productId}/reviews`, {
      customer_id: customer.id,
      rating,
      comment,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { reviewId, rating, comment } = await req.json();
    const { data: { customer } } = await medusaClient.customers.retrieve();
    
    if (!customer) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!reviewId) {
      return NextResponse.json(
        { error: "Review ID is required" },
        { status: 400 }
      );
    }

    if (rating && (rating < 1 || rating > 5)) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    await medusaClient.client.request("PUT", `/store/reviews/${reviewId}`, {
      rating,
      comment,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json(
      { error: "Failed to update review" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { reviewId } = await req.json();
    const { data: { customer } } = await medusaClient.customers.retrieve();
    
    if (!customer) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!reviewId) {
      return NextResponse.json(
        { error: "Review ID is required" },
        { status: 400 }
      );
    }

    await medusaClient.client.request("DELETE", `/store/reviews/${reviewId}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    );
  }
} 