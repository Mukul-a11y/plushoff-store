import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from "typeorm"
import { BaseEntity } from "@medusajs/medusa"
import { generateEntityId } from "@medusajs/medusa/dist/utils"
import { Order } from "@medusajs/medusa/dist/models/order"
import { Return } from "./return"

export enum RefundStatus {
  PENDING = "pending",
  PROCESSED = "processed",
  FAILED = "failed"
}

export enum RefundType {
  RETURN = "return",
  CANCELLATION = "cancellation",
  PARTIAL = "partial",
  OTHER = "other"
}

@Entity()
export class Refund extends BaseEntity {
  @Column()
  order_id: string

  @ManyToOne(() => Order)
  @JoinColumn({ name: "order_id" })
  order: Order

  @Column({ nullable: true })
  return_id: string | null

  @ManyToOne(() => Return)
  @JoinColumn({ name: "return_id" })
  return: Return | null

  @Column({ type: "numeric" })
  amount: number

  @Column({
    type: "enum",
    enum: RefundType,
    default: RefundType.OTHER
  })
  type: RefundType

  @Column({ type: "text", nullable: true })
  note: string | null

  @Column({
    type: "enum",
    enum: RefundStatus,
    default: RefundStatus.PENDING
  })
  status: RefundStatus

  @Column({ type: "text", nullable: true })
  reason: string | null

  @Column({ type: "jsonb", nullable: true })
  metadata: Record<string, unknown> | null

  @Column({ type: "timestamptz", nullable: true })
  processed_at: Date | null

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "ref")
  }
} 