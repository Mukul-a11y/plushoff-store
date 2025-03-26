import { AwilixContainer } from "awilix"
import EmailService from "../services/email"

export default async (container: AwilixContainer): Promise<void> => {
  try {
    container.register({
      emailService: asClass(EmailService).singleton(),
    })
  } catch (error) {
    console.error("Failed to register email service:", error)
  }
} 