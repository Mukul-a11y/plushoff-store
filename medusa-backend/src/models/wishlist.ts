import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm"
import { BaseEntity, Customer, Product } from "@medusajs/medusa"
import { generateEntityId } from "@medusajs/utils"

@Entity()
export class Wishlist extends BaseEntity {
  @Index()
  @Column({ type: "varchar", nullable: false })
  customer_id: string

  @ManyToOne(() => Customer)
  @JoinColumn({ name: "customer_id" })
  customer: Customer

  @Index()
  @Column({ type: "varchar", nullable: false })
  product_id: string

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product: Product

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "wish")
  }
} 