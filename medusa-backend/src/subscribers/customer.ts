import { EventBusService } from "@medusajs/medusa"
import EmailService from "../services/email"

type InjectedDependencies = {
  eventBusService: EventBusService
  emailService: EmailService
}

type CustomerData = {
  id: string
  email: string
  first_name: string
}

type PasswordResetData = {
  email: string
  token: string
}

class CustomerSubscriber {
  protected emailService_: EmailService
  protected eventBus_: EventBusService

  constructor({ eventBusService, emailService }: InjectedDependencies) {
    this.emailService_ = emailService
    this.eventBus_ = eventBusService

    this.eventBus_.subscribe("customer.created", this.handleCustomerCreated as any)
    this.eventBus_.subscribe("customer.password_reset", this.handlePasswordReset as any)
  }

  handleCustomerCreated = async (data: CustomerData): Promise<void> => {
    const { email, first_name } = data

    try {
      await this.emailService_.sendWelcomeEmail(email, first_name)
    } catch (error) {
      console.error("Failed to send welcome email:", error)
    }
  }

  handlePasswordReset = async (data: PasswordResetData): Promise<void> => {
    const { email, token } = data

    try {
      await this.emailService_.sendPasswordReset(email, token)
    } catch (error) {
      console.error("Failed to send password reset email:", error)
    }
  }
}

export default CustomerSubscriber 