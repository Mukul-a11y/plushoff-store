import { TransactionBaseService } from "@medusajs/medusa"
import { EntityManager } from "typeorm"
import Razorpay from "razorpay"
import { MedusaError } from "@medusajs/utils"

type InjectedDependencies = {
  manager: EntityManager
}

class PaymentService extends TransactionBaseService {
  protected manager_: EntityManager
  protected transactionManager_: EntityManager | undefined
  protected razorpay_: Razorpay

  constructor(container: InjectedDependencies) {
    super(container)
    this.manager_ = container.manager
    this.initializeRazorpay()
  }

  private initializeRazorpay(): void {
    this.razorpay_ = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    })
  }

  async createPayment(
    amount: number,
    currency: string,
    orderId: string,
    customerEmail: string,
    customerName: string
  ): Promise<any> {
    try {
      const options = {
        amount: amount * 100, // Razorpay expects amount in paise
        currency,
        receipt: orderId,
        notes: {
          order_id: orderId,
          customer_email: customerEmail,
          customer_name: customerName
        }
      }

      const order = await this.razorpay_.orders.create(options)
      return order
    } catch (error) {
      throw new MedusaError(
        MedusaError.Types.PAYMENT_ERROR,
        "Failed to create Razorpay order"
      )
    }
  }

  async verifyPayment(
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
  ): Promise<boolean> {
    try {
      const body = razorpayOrderId + "|" + razorpayPaymentId
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
        .update(body.toString())
        .digest("hex")

      const isAuthentic = expectedSignature === razorpaySignature
      if (!isAuthentic) {
        throw new MedusaError(
          MedusaError.Types.PAYMENT_ERROR,
          "Invalid payment signature"
        )
      }

      return true
    } catch (error) {
      throw new MedusaError(
        MedusaError.Types.PAYMENT_ERROR,
        "Failed to verify payment"
      )
    }
  }

  async capturePayment(paymentId: string): Promise<any> {
    try {
      const payment = await this.razorpay_.payments.capture(paymentId)
      return payment
    } catch (error) {
      throw new MedusaError(
        MedusaError.Types.PAYMENT_ERROR,
        "Failed to capture payment"
      )
    }
  }

  async refundPayment(
    paymentId: string,
    amount: number,
    notes: Record<string, any> = {}
  ): Promise<any> {
    try {
      const refund = await this.razorpay_.payments.refund(paymentId, {
        amount: amount * 100, // Convert to paise
        notes
      })
      return refund
    } catch (error) {
      throw new MedusaError(
        MedusaError.Types.PAYMENT_ERROR,
        "Failed to refund payment"
      )
    }
  }

  async getPayment(paymentId: string): Promise<any> {
    try {
      const payment = await this.razorpay_.payments.fetch(paymentId)
      return payment
    } catch (error) {
      throw new MedusaError(
        MedusaError.Types.PAYMENT_ERROR,
        "Failed to fetch payment"
      )
    }
  }
} 