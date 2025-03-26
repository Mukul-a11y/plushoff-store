import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { medusaClient } from "@/lib/config"
import PaymentForm from "@/components/PaymentForm"

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect("/auth/login?callbackUrl=/checkout")
  }

  // Get cart
  const { cart } = await medusaClient.carts.retrieve()
  if (!cart || !cart.items?.length) {
    redirect("/cart")
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        {/* Order Summary */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <div className="space-y-2">
            {cart.items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.title} x {item.quantity}</span>
                <span>₹{item.unit_price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{cart.total}</span>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
          <PaymentForm
            orderId={cart.id}
            amount={cart.total}
            currency="INR"
            customerEmail={session.user.email}
            customerName={session.user.name}
            onSuccess={async (paymentId, orderId, signature) => {
              // Handle successful payment
              await medusaClient.carts.complete(cart.id)
              redirect("/account/orders")
            }}
            onError={(error) => {
              console.error("Payment failed:", error)
            }}
          />
        </div>
      </div>
    </div>
  )
} 