import { AwilixContainer, asClass } from "awilix"
import ShippingService from "../services/shipping"

export default async (container: AwilixContainer): Promise<void> => {
  try {
    container.register({
      shippingService: asClass(ShippingService).singleton(),
    })
  } catch (error) {
    console.error("Failed to register shipping service:", error)
  }
} 