import { TransactionBaseService } from "@medusajs/medusa"
import { EntityManager } from "typeorm"
import { Resend } from "resend"
import { readFileSync } from "fs"
import { compile } from "handlebars"
import path from "path"

type InjectedDependencies = {
  manager: EntityManager
}

type EmailTemplate = "order_confirmation" | "shipping_update" | "password_reset" | "welcome"

class EmailService extends TransactionBaseService {
  protected manager_: EntityManager
  protected transactionManager_: EntityManager | undefined
  protected resend_: Resend

  constructor(container: InjectedDependencies) {
    super(container)
    this.manager_ = container.manager
    this.initializeResend()
  }

  private initializeResend(): void {
    this.resend_ = new Resend(process.env.RESEND_API_KEY)
  }

  private async getTemplate(template: EmailTemplate): Promise<HandlebarsTemplateDelegate> {
    const templatePath = path.join(__dirname, "..", "templates", `${template}.hbs`)
    const templateContent = readFileSync(templatePath, "utf-8")
    return compile(templateContent)
  }

  async sendOrderConfirmation(
    to: string,
    data: {
      order_id: string
      customer_name: string
      items: Array<{
        title: string
        quantity: number
        price: number
      }>
      total: number
      shipping_address: {
        address_1: string
        address_2?: string
        city: string
        state: string
        postal_code: string
        country_code: string
      }
    }
  ): Promise<void> {
    const template = await this.getTemplate("order_confirmation")
    const html = template(data)

    await this.resend_.emails.send({
      from: process.env.EMAIL_FROM || "orders@plushoff.com",
      to,
      subject: `Order Confirmation #${data.order_id}`,
      html
    })
  }

  async sendShippingUpdate(
    to: string,
    data: {
      order_id: string
      customer_name: string
      tracking_number: string
      carrier: string
      estimated_delivery: string
      status: string
    }
  ): Promise<void> {
    const template = await this.getTemplate("shipping_update")
    const html = template(data)

    await this.resend_.emails.send({
      from: process.env.EMAIL_FROM || "shipping@plushoff.com",
      to,
      subject: `Shipping Update for Order #${data.order_id}`,
      html
    })
  }

  async sendPasswordReset(
    to: string,
    data: {
      customer_name: string
      reset_link: string
      expiry_time: string
    }
  ): Promise<void> {
    const template = await this.getTemplate("password_reset")
    const html = template(data)

    await this.resend_.emails.send({
      from: process.env.EMAIL_FROM || "security@plushoff.com",
      to,
      subject: "Reset Your Password",
      html
    })
  }

  async sendWelcomeEmail(
    to: string,
    data: {
      customer_name: string
      verification_link?: string
    }
  ): Promise<void> {
    const template = await this.getTemplate("welcome")
    const html = template(data)

    await this.resend_.emails.send({
      from: process.env.EMAIL_FROM || "welcome@plushoff.com",
      to,
      subject: "Welcome to Plushoff!",
      html
    })
  }
}

export default EmailService 