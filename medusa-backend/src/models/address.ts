import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from "typeorm"
import { BaseEntity } from "@medusajs/medusa"
import { generateEntityId } from "@medusajs/medusa/dist/utils"
import { Customer } from "@medusajs/medusa/dist/models/customer"

@Entity()
export class Address extends BaseEntity {
  @Column()
  customer_id: string

  @ManyToOne(() => Customer)
  @JoinColumn({ name: "customer_id" })
  customer: Customer

  @Column()
  first_name: string

  @Column()
  last_name: string

  @Column()
  address_1: string

  @Column({ nullable: true })
  address_2: string | null

  @Column()
  city: string

  @Column()
  state: string

  @Column()
  postal_code: string

  @Column()
  country_code: string

  @Column({ nullable: true })
  phone: string | null

  @Column({ default: false })
  is_default: boolean

  @Column({ type: "jsonb", nullable: true })
  metadata: Record<string, unknown> | null

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "addr")
  }
} 