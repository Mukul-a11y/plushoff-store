import { TransactionBaseService } from "@medusajs/medusa"
import { EntityManager } from "typeorm"
import { Wishlist } from "../models/wishlist"
import { MedusaError } from "@medusajs/utils"

class WishlistService extends TransactionBaseService {
  protected manager_: EntityManager
  protected transactionManager_: EntityManager | undefined

  constructor(container) {
    super(container)
  }

  async addItem(
    customerId: string,
    productId: string
  ): Promise<Wishlist> {
    return await this.atomicPhase_(async (manager) => {
      const wishlistRepository = manager.getRepository(Wishlist)

      const existing = await wishlistRepository.findOne({
        where: {
          customer_id: customerId,
          product_id: productId,
        },
      })

      if (existing) {
        throw new MedusaError(
          MedusaError.Types.DUPLICATE_ERROR,
          "Product already in wishlist"
        )
      }

      const wishlistItem = wishlistRepository.create({
        customer_id: customerId,
        product_id: productId,
      })

      return await wishlistRepository.save(wishlistItem)
    })
  }

  async removeItem(
    customerId: string,
    productId: string
  ): Promise<void> {
    return await this.atomicPhase_(async (manager) => {
      const wishlistRepository = manager.getRepository(Wishlist)

      const existing = await wishlistRepository.findOne({
        where: {
          customer_id: customerId,
          product_id: productId,
        },
      })

      if (!existing) {
        return
      }

      await wishlistRepository.remove(existing)
    })
  }

  async list(
    customerId: string
  ): Promise<Wishlist[]> {
    const wishlistRepository = this.manager_.getRepository(Wishlist)

    return await wishlistRepository.find({
      where: {
        customer_id: customerId,
      },
      relations: ["product"],
    })
  }
} 