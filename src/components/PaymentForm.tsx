"use client"

import Script from "next/script"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface RazorpayResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

interface RazorpayInstance {
  open: () => void
}

interface RazorpayClass {
  new (options: RazorpayOptions): RazorpayInstance
}

interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  prefill: {
    name: string
    email: string
  }
  handler: (response: RazorpayResponse) => void
  modal: {
    ondismiss: () => void
  }
  theme: {
    color: string
  }
}

interface CreatePaymentResponse {
  razorpayOrderId: string
  error?: {
    message: string
  }
}

interface PaymentError extends Error {
  code?: string
  description?: string
}

declare global {
  interface Window {
    Razorpay: RazorpayClass
  }
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_RAZORPAY_KEY_ID: string
    }
  }
}

interface PaymentFormProps {
  orderId: string
  amount: number
  currency: string
  customerEmail: string
  customerName: string
  onSuccess: (paymentId: string, orderId: string, signature: string) => void
  onError: (error: Error) => void
}

export default function PaymentForm({
  orderId,
  amount,
  currency,
  customerEmail,
  customerName,
  onSuccess,
  onError
}: PaymentFormProps) {
  const { toast } = useToast()
  
  const handlePaymentError = (error: unknown): PaymentError => {
    if (error instanceof Error) {
      return error as PaymentError
    }
    if (typeof error === 'string') {
      return new Error(error) as PaymentError
    }
    return new Error('An unknown error occurred') as PaymentError
  }
  
  const initializePayment = async () => {
    try {
      if (typeof window === 'undefined' || !window.Razorpay) {
        throw new Error('Razorpay SDK not loaded')
      }

      // Create Razorpay order
      const response = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency,
          orderId,
          customerEmail,
          customerName
        })
      })

      const data = await response.json() as CreatePaymentResponse
      
      if (!response.ok || data.error) {
        throw new Error(data.error?.message || "Failed to create payment")
      }

      const { razorpayOrderId } = data
      if (!razorpayOrderId) {
        throw new Error('Invalid order ID received')
      }

      const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
      if (!RAZORPAY_KEY_ID) {
        throw new Error('NEXT_PUBLIC_RAZORPAY_KEY_ID is not defined')
      }

      // Initialize Razorpay options
      const options: RazorpayOptions = {
        key: RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency,
        name: "Plushoff",
        description: `Order #${orderId}`,
        order_id: razorpayOrderId,
        prefill: {
          name: customerName,
          email: customerEmail
        },
        handler: function (response: RazorpayResponse) {
          onSuccess(
            response.razorpay_payment_id,
            response.razorpay_order_id,
            response.razorpay_signature
          )
        },
        modal: {
          ondismiss: function () {
            toast({
              title: "Payment Cancelled",
              description: "You have cancelled the payment",
              variant: "destructive"
            })
          }
        },
        theme: {
          color: "#4a90e2"
        }
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      const paymentError = handlePaymentError(error)
      console.error("Payment initialization failed:", paymentError)
      onError(paymentError)
      toast({
        title: "Error",
        description: paymentError.message,
        variant: "destructive"
      })
    }
  }

  return (
    <div className="space-y-4">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      
      <Button
        onClick={initializePayment}
        className="w-full"
      >
        Pay ₹{amount}
      </Button>
    </div>
  )
} 