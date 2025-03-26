import { TransactionBaseService } from "@medusajs/medusa"
import { EntityManager } from "typeorm"
import { Review } from "../models/review"
import { MedusaError } from "@medusajs/utils"

class ReviewService extends TransactionBaseService {
  protected manager_: EntityManager
  protected transactionManager_: EntityManager | undefined

  constructor(container) {
    super(container)
  }

  async create(
    customerId: string,
    productId: string,
    rating: number,
    comment?: string
  ): Promise<Review> {
    return await this.atomicPhase_(async (manager) => {
      const reviewRepository = manager.getRepository(Review)

      // Check if rating is valid (1-5)
      if (rating < 1 || rating > 5) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          "Rating must be between 1 and 5"
        )
      }

      // Check if user has already reviewed this product
      const existing = await reviewRepository.findOne({
        where: {
          customer_id: customerId,
          product_id: productId,
        },
      })

      if (existing) {
        throw new MedusaError(
          MedusaError.Types.DUPLICATE_ERROR,
          "You have already reviewed this product"
        )
      }

      const review = reviewRepository.create({
        customer_id: customerId,
        product_id: productId,
        rating,
        comment,
        is_approved: false, // Reviews need moderation by default
      })

      return await reviewRepository.save(review)
    })
  }

  async update(
    reviewId: string,
    data: {
      rating?: number
      comment?: string
      is_approved?: boolean
    }
  ): Promise<Review> {
    return await this.atomicPhase_(async (manager) => {
      const reviewRepository = manager.getRepository(Review)

      const review = await reviewRepository.findOne({
        where: { id: reviewId },
      })

      if (!review) {
        throw new MedusaError(
          MedusaError.Types.NOT_FOUND,
          "Review not found"
        )
      }

      if (data.rating && (data.rating < 1 || data.rating > 5)) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          "Rating must be between 1 and 5"
        )
      }

      const updatedReview = Object.assign(review, data)
      return await reviewRepository.save(updatedReview)
    })
  }

  async delete(reviewId: string): Promise<void> {
    return await this.atomicPhase_(async (manager) => {
      const reviewRepository = manager.getRepository(Review)

      const review = await reviewRepository.findOne({
        where: { id: reviewId },
      })

      if (!review) {
        return
      }

      await reviewRepository.remove(review)
    })
  }

  async list(
    productId: string,
    onlyApproved = true
  ): Promise<Review[]> {
    const reviewRepository = this.manager_.getRepository(Review)

    const query: any = {
      product_id: productId,
    }

    if (onlyApproved) {
      query.is_approved = true
    }

    return await reviewRepository.find({
      where: query,
      relations: ["customer"],
      order: {
        created_at: "DESC",
      },
    })
  }

  async getAverageRating(productId: string): Promise<number> {
    const reviewRepository = this.manager_.getRepository(Review)

    const reviews = await reviewRepository.find({
      where: {
        product_id: productId,
        is_approved: true,
      },
      select: ["rating"],
    })

    if (!reviews.length) {
      return 0
    }

    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    return sum / reviews.length
  }
} 