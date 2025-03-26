import { TransactionBaseService } from "@medusajs/medusa"
import { EntityManager } from "typeorm"
import { Address } from "../models/address"
import { MedusaError } from "@medusajs/utils"

type InjectedDependencies = {
  manager: EntityManager
}

class AddressService extends TransactionBaseService {
  protected manager_: EntityManager
  protected transactionManager_: EntityManager | undefined

  constructor(container: InjectedDependencies) {
    super(container)
    this.manager_ = container.manager
  }

  async create(data: {
    customer_id: string
    first_name: string
    last_name: string
    address_1: string
    address_2?: string
    city: string
    state: string
    postal_code: string
    country_code: string
    phone?: string
    is_default?: boolean
  }): Promise<Address> {
    return await this.atomicPhase_(async (manager) => {
      const addressRepo = manager.getRepository(Address)

      // If this is the first address or is_default is true, set it as default
      if (data.is_default === undefined) {
        const existingAddresses = await addressRepo.find({
          where: { customer_id: data.customer_id }
        })
        data.is_default = existingAddresses.length === 0
      }

      // If setting as default, unset other default addresses
      if (data.is_default) {
        await addressRepo.update(
          { customer_id: data.customer_id, is_default: true },
          { is_default: false }
        )
      }

      const address = addressRepo.create(data)
      return await addressRepo.save(address)
    })
  }

  async update(
    addressId: string,
    data: {
      first_name?: string
      last_name?: string
      address_1?: string
      address_2?: string
      city?: string
      state?: string
      postal_code?: string
      country_code?: string
      phone?: string
      is_default?: boolean
    }
  ): Promise<Address> {
    return await this.atomicPhase_(async (manager) => {
      const addressRepo = manager.getRepository(Address)
      const address = await addressRepo.findOne({ where: { id: addressId } })

      if (!address) {
        throw new MedusaError(
          MedusaError.Types.NOT_FOUND,
          `Address with id ${addressId} not found`
        )
      }

      // If setting as default, unset other default addresses
      if (data.is_default) {
        await addressRepo.update(
          { customer_id: address.customer_id, is_default: true },
          { is_default: false }
        )
      }

      Object.assign(address, data)
      return await addressRepo.save(address)
    })
  }

  async delete(addressId: string): Promise<void> {
    return await this.atomicPhase_(async (manager) => {
      const addressRepo = manager.getRepository(Address)
      const address = await addressRepo.findOne({ where: { id: addressId } })

      if (!address) {
        return
      }

      // If deleting default address, set another address as default
      if (address.is_default) {
        const otherAddress = await addressRepo.findOne({
          where: { customer_id: address.customer_id, id: Not(addressId) }
        })
        if (otherAddress) {
          otherAddress.is_default = true
          await addressRepo.save(otherAddress)
        }
      }

      await addressRepo.remove(address)
    })
  }

  async list(
    customerId: string,
    config = { skip: 0, take: 20 }
  ): Promise<Address[]> {
    const addressRepo = this.manager_.getRepository(Address)
    return await addressRepo.find({
      where: { customer_id: customerId },
      skip: config.skip,
      take: config.take,
      order: { created_at: "DESC" }
    })
  }

  async getDefault(customerId: string): Promise<Address | null> {
    const addressRepo = this.manager_.getRepository(Address)
    return await addressRepo.findOne({
      where: { customer_id: customerId, is_default: true }
    })
  }
} 