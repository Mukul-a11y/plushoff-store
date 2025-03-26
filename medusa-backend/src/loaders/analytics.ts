import { AwilixContainer, asClass } from "awilix"
import AnalyticsService from "../services/analytics"

export default async (container: AwilixContainer): Promise<void> => {
  try {
    container.register({
      analyticsService: asClass(AnalyticsService).singleton(),
    })
  } catch (error) {
    console.error("Failed to register analytics service:", error)
  }
} 