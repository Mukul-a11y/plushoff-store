import { TransactionBaseService } from "@medusajs/medusa"
import { EntityManager } from "typeorm"
import { MedusaError } from "@medusajs/utils"
import axios from "axios"

type InjectedDependencies = {
  manager: EntityManager
}

interface ShippingRate {
  provider: string
  service: string
  rate: number
  estimated_days: number
}

interface ShippingLabel {
  tracking_number: string
  label_url: string
  carrier: string
}

interface TrackingInfo {
  status: string
  estimated_delivery: Date
  tracking_events: {
    timestamp: Date
    location: string
    description: string
  }[]
}

class ShippingService extends TransactionBaseService {
  protected readonly manager_: EntityManager
  protected transactionManager_: EntityManager | undefined

  constructor(container: InjectedDependencies) {
    super(container)
    this.manager_ = container.manager
  }

  async calculateShippingRates(data: {
    origin: {
      postal_code: string
      country_code: string
    }
    destination: {
      postal_code: string
      country_code: string
    }
    items: {
      weight: number
      length: number
      width: number
      height: number
      quantity: number
    }[]
  }): Promise<ShippingRate[]> {
    const rates: ShippingRate[] = []

    // Calculate UPS rates
    try {
      const upsRates = await this.getUPSRates(data)
      rates.push(...upsRates)
    } catch (error) {
      console.error("Failed to get UPS rates:", error)
    }

    // Calculate FedEx rates
    try {
      const fedexRates = await this.getFedExRates(data)
      rates.push(...fedexRates)
    } catch (error) {
      console.error("Failed to get FedEx rates:", error)
    }

    // Calculate USPS rates
    try {
      const uspsRates = await this.getUSPSRates(data)
      rates.push(...uspsRates)
    } catch (error) {
      console.error("Failed to get USPS rates:", error)
    }

    if (rates.length === 0) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        "No shipping rates available"
      )
    }

    return rates
  }

  private async getUPSRates(data: any): Promise<ShippingRate[]> {
    try {
      const response = await axios.post(
        `${process.env.UPS_API_URL}/rating/v1/rates`,
        {
          RateRequest: {
            Shipment: {
              Shipper: {
                Address: {
                  PostalCode: data.origin.postal_code,
                  CountryCode: data.origin.country_code,
                },
              },
              ShipTo: {
                Address: {
                  PostalCode: data.destination.postal_code,
                  CountryCode: data.destination.country_code,
                },
              },
              Package: data.items.map((item: any) => ({
                PackagingType: { Code: "02" },
                Dimensions: {
                  UnitOfMeasurement: { Code: "IN" },
                  Length: item.length,
                  Width: item.width,
                  Height: item.height,
                },
                PackageWeight: {
                  UnitOfMeasurement: { Code: "LBS" },
                  Weight: item.weight,
                },
              })),
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.UPS_ACCESS_TOKEN}`,
          },
        }
      )

      return response.data.RateResponse.RatedShipment.map((rate: any) => ({
        provider: "UPS",
        service: rate.Service.Description,
        rate: parseFloat(rate.TotalCharges.MonetaryValue),
        estimated_days: this.estimateDeliveryDays(rate.GuaranteedDelivery),
      }))
    } catch (error) {
      console.error("UPS API Error:", error)
      return []
    }
  }

  private async getFedExRates(data: any): Promise<ShippingRate[]> {
    try {
      const response = await axios.post(
        `${process.env.FEDEX_API_URL}/rate/v1/rates/quotes`,
        {
          accountNumber: {
            value: process.env.FEDEX_ACCOUNT_NUMBER,
          },
          requestedShipment: {
            shipper: {
              address: {
                postalCode: data.origin.postal_code,
                countryCode: data.origin.country_code,
              },
            },
            recipient: {
              address: {
                postalCode: data.destination.postal_code,
                countryCode: data.destination.country_code,
              },
            },
            requestedPackageLineItems: data.items.map((item: any) => ({
              weight: {
                units: "LB",
                value: item.weight,
              },
              dimensions: {
                length: item.length,
                width: item.width,
                height: item.height,
                units: "IN",
              },
            })),
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.FEDEX_ACCESS_TOKEN}`,
          },
        }
      )

      return response.data.output.rateReplyDetails.map((rate: any) => ({
        provider: "FedEx",
        service: rate.serviceName,
        rate: rate.ratedShipmentDetails[0].totalNetCharge,
        estimated_days: this.estimateDeliveryDays(rate.transitTime),
      }))
    } catch (error) {
      console.error("FedEx API Error:", error)
      return []
    }
  }

  private async getUSPSRates(data: any): Promise<ShippingRate[]> {
    try {
      const response = await axios.post(
        `${process.env.USPS_API_URL}/rates`,
        {
          origin_zip: data.origin.postal_code,
          destination_zip: data.destination.postal_code,
          packages: data.items.map((item: any) => ({
            weight: item.weight,
            length: item.length,
            width: item.width,
            height: item.height,
          })),
        },
        {
          headers: {
            "USPS-API-Key": process.env.USPS_API_KEY,
          },
        }
      )

      return response.data.rates.map((rate: any) => ({
        provider: "USPS",
        service: rate.service,
        rate: rate.rate,
        estimated_days: rate.estimated_days,
      }))
    } catch (error) {
      console.error("USPS API Error:", error)
      return []
    }
  }

  private estimateDeliveryDays(deliveryTime: any): number {
    // Implement delivery time estimation logic based on carrier response
    return 3 // Default estimate
  }

  async createShippingLabel(data: {
    provider: string
    service: string
    origin: {
      name: string
      company: string
      address_1: string
      address_2?: string
      city: string
      state: string
      postal_code: string
      country_code: string
      phone: string
    }
    destination: {
      name: string
      company?: string
      address_1: string
      address_2?: string
      city: string
      state: string
      postal_code: string
      country_code: string
      phone: string
    }
    packages: {
      weight: number
      length: number
      width: number
      height: number
      contents: string
    }[]
  }): Promise<ShippingLabel> {
    switch (data.provider) {
      case "UPS":
        return this.createUPSLabel(data)
      case "FedEx":
        return this.createFedExLabel(data)
      case "USPS":
        return this.createUSPSLabel(data)
      default:
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          "Unsupported shipping provider"
        )
    }
  }

  private async createUPSLabel(data: any): Promise<ShippingLabel> {
    // Implement UPS label creation
    return {
      tracking_number: "1Z999999999999999",
      label_url: "https://ups.com/label/123",
      carrier: "UPS"
    }
  }

  private async createFedExLabel(data: any): Promise<ShippingLabel> {
    // Implement FedEx label creation
    return {
      tracking_number: "999999999999",
      label_url: "https://fedex.com/label/123",
      carrier: "FedEx"
    }
  }

  private async createUSPSLabel(data: any): Promise<ShippingLabel> {
    // Implement USPS label creation
    return {
      tracking_number: "9999999999999999999999",
      label_url: "https://usps.com/label/123",
      carrier: "USPS"
    }
  }

  async trackShipment(
    trackingNumber: string,
    carrier: string
  ): Promise<TrackingInfo> {
    switch (carrier) {
      case "UPS":
        return this.trackUPSShipment(trackingNumber)
      case "FedEx":
        return this.trackFedExShipment(trackingNumber)
      case "USPS":
        return this.trackUSPSShipment(trackingNumber)
      default:
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          "Unsupported carrier"
        )
    }
  }

  private async trackUPSShipment(trackingNumber: string): Promise<TrackingInfo> {
    // Implement UPS tracking
    return {
      status: "In Transit",
      estimated_delivery: new Date(),
      tracking_events: [
        {
          timestamp: new Date(),
          location: "Warehouse",
          description: "Package received"
        }
      ]
    }
  }

  private async trackFedExShipment(trackingNumber: string): Promise<TrackingInfo> {
    // Implement FedEx tracking
    return {
      status: "In Transit",
      estimated_delivery: new Date(),
      tracking_events: [
        {
          timestamp: new Date(),
          location: "Sorting Facility",
          description: "Package processed"
        }
      ]
    }
  }

  private async trackUSPSShipment(trackingNumber: string): Promise<TrackingInfo> {
    // Implement USPS tracking
    return {
      status: "In Transit",
      estimated_delivery: new Date(),
      tracking_events: [
        {
          timestamp: new Date(),
          location: "Post Office",
          description: "Package accepted"
        }
      ]
    }
  }
}

export default ShippingService 