import { EventBusService } from "@medusajs/medusa"
import EmailService from "../services/email"

type InjectedDependencies = {
  eventBusService: EventBusService
  emailService: EmailService
}

class OrderSubscriber {
  protected emailService_: EmailService
  protected eventBus_: EventBusService

  constructor({ eventBusService, emailService }: InjectedDependencies) {
    this.emailService_ = emailService
    this.eventBus_ = eventBusService

    this.eventBus_.subscribe("order.placed", this.handleOrderPlaced)
    this.eventBus_.subscribe("order.shipment_created", this.handleShipmentCreated)
    this.eventBus_.subscribe("order.canceled", this.handleOrderCanceled)
  }

  handleOrderPlaced = async (data: Record<string, any>): Promise<void> => {
    const orderId = data.id

    try {
      await this.emailService_.sendOrderConfirmation(orderId)
    } catch (error) {
      console.error("Failed to send order confirmation email:", error)
    }
  }

  handleShipmentCreated = async (data: Record<string, any>): Promise<void> => {
    const orderId = data.id

    try {
      await this.emailService_.sendShippingUpdate(orderId, "shipped")
    } catch (error) {
      console.error("Failed to send shipping update email:", error)
    }
  }

  handleOrderCanceled = async (data: Record<string, any>): Promise<void> => {
    const orderId = data.id

    try {
      await this.emailService_.sendShippingUpdate(orderId, "canceled")
    } catch (error) {
      console.error("Failed to send order cancellation email:", error)
    }
  }
}

export default OrderSubscriber 