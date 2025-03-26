import { TransactionBaseService } from "@medusajs/medusa"
import { EntityManager } from "typeorm"
import { MedusaError } from "@medusajs/utils"
import axios from "axios"

type InjectedDependencies = {
  manager: EntityManager
}

interface AnalyticsEvent {
  event_type: string
  user_id?: string
  timestamp: Date
  properties: Record<string, any>
}

interface SalesMetrics {
  total_revenue: number
  total_orders: number
  average_order_value: number
  top_selling_products: {
    product_id: string
    name: string
    quantity: number
    revenue: number
  }[]
}

interface UserMetrics {
  total_users: number
  active_users: number
  new_users: number
  returning_users: number
  average_session_duration: number
}

interface PerformanceMetrics {
  page_load_time: number
  api_response_time: number
  error_rate: number
  server_uptime: number
}

class AnalyticsService extends TransactionBaseService {
  protected readonly manager_: EntityManager
  protected transactionManager_: EntityManager | undefined

  constructor(container: InjectedDependencies) {
    super(container)
    this.manager_ = container.manager
  }

  async trackEvent(event: AnalyticsEvent): Promise<void> {
    try {
      // Send event to Google Analytics
      await this.sendToGoogleAnalytics(event)

      // Send event to Mixpanel
      await this.sendToMixpanel(event)

      // Send event to custom analytics database
      await this.storeEventInDatabase(event)
    } catch (error) {
      console.error("Failed to track event:", error)
    }
  }

  private async sendToGoogleAnalytics(event: AnalyticsEvent): Promise<void> {
    try {
      await axios.post(
        `https://www.google-analytics.com/mp/collect?measurement_id=${process.env.GA_MEASUREMENT_ID}&api_secret=${process.env.GA_API_SECRET}`,
        {
          client_id: event.user_id || "anonymous",
          events: [{
            name: event.event_type,
            params: event.properties
          }]
        }
      )
    } catch (error) {
      console.error("Failed to send event to Google Analytics:", error)
    }
  }

  private async sendToMixpanel(event: AnalyticsEvent): Promise<void> {
    try {
      await axios.post(
        `https://api.mixpanel.com/track`,
        {
          event: event.event_type,
          properties: {
            ...event.properties,
            distinct_id: event.user_id,
            time: event.timestamp.getTime(),
            token: process.env.MIXPANEL_TOKEN
          }
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "text/plain"
          }
        }
      )
    } catch (error) {
      console.error("Failed to send event to Mixpanel:", error)
    }
  }

  private async storeEventInDatabase(event: AnalyticsEvent): Promise<void> {
    // Store event in database for custom analytics
    // Implementation depends on database schema
  }

  async getSalesMetrics(startDate: Date, endDate: Date): Promise<SalesMetrics> {
    try {
      // Implement sales metrics calculation from database
      return {
        total_revenue: 0,
        total_orders: 0,
        average_order_value: 0,
        top_selling_products: []
      }
    } catch (error) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Failed to get sales metrics"
      )
    }
  }

  async getUserMetrics(startDate: Date, endDate: Date): Promise<UserMetrics> {
    try {
      // Implement user metrics calculation from database
      return {
        total_users: 0,
        active_users: 0,
        new_users: 0,
        returning_users: 0,
        average_session_duration: 0
      }
    } catch (error) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Failed to get user metrics"
      )
    }
  }

  async getPerformanceMetrics(startDate: Date, endDate: Date): Promise<PerformanceMetrics> {
    try {
      // Implement performance metrics calculation
      return {
        page_load_time: 0,
        api_response_time: 0,
        error_rate: 0,
        server_uptime: 0
      }
    } catch (error) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Failed to get performance metrics"
      )
    }
  }

  async generateAnalyticsReport(startDate: Date, endDate: Date): Promise<{
    sales: SalesMetrics
    users: UserMetrics
    performance: PerformanceMetrics
  }> {
    const [sales, users, performance] = await Promise.all([
      this.getSalesMetrics(startDate, endDate),
      this.getUserMetrics(startDate, endDate),
      this.getPerformanceMetrics(startDate, endDate)
    ])

    return {
      sales,
      users,
      performance
    }
  }
}

export default AnalyticsService 