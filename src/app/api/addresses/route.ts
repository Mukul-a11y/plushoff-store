import { NextRequest } from "next/server";
import { medusaClient } from "@/lib/config";

export async function GET(req: NextRequest) {
  try {
    const { data: { customer } } = await medusaClient.customers.retrieve();
    if (!customer) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { data: { addresses } } = await medusaClient.customers.addresses.list(customer.id);
    return Response.json(addresses);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return new Response("Error fetching addresses", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const requiredFields = [
      "first_name",
      "last_name",
      "address_1",
      "city",
      "state",
      "postal_code",
      "country_code"
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return new Response(`Missing required field: ${field}`, { status: 400 });
      }
    }

    const { data: { customer } } = await medusaClient.customers.retrieve();
    if (!customer) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { data: { address } } = await medusaClient.customers.addresses.create(customer.id, data);
    return Response.json(address);
  } catch (error) {
    console.error("Error creating address:", error);
    return new Response("Error creating address", { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { address_id, ...data } = await req.json();

    if (!address_id) {
      return new Response("Missing address ID", { status: 400 });
    }

    const { data: { customer } } = await medusaClient.customers.retrieve();
    if (!customer) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { data: { address } } = await medusaClient.customers.addresses.update(customer.id, address_id, data);
    return Response.json(address);
  } catch (error) {
    console.error("Error updating address:", error);
    return new Response("Error updating address", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const addressId = searchParams.get("addressId");

    if (!addressId) {
      return new Response("Missing address ID", { status: 400 });
    }

    const { data: { customer } } = await medusaClient.customers.retrieve();
    if (!customer) {
      return new Response("Unauthorized", { status: 401 });
    }

    await medusaClient.customers.addresses.delete(customer.id, addressId);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting address:", error);
    return new Response("Error deleting address", { status: 500 });
  }
} 