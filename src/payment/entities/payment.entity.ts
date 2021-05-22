import { Address } from "src/address/entities/address.entity";
import { UserEntity } from "src/auth/entities/user.entity";

import { Order } from "src/order/entities/order.entity";
import { Product } from "src/product/entities/product.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "payment" })
export class Payment {
  @PrimaryGeneratedColumn()
  paymentId: number;

  @Column({ default: "pending" })
  paymentStatus: string;

  @Column({ default: 0, precision: 10 })
  payAmount: number;

  @Column({ nullable: false })
  cardName: string;

  @Column({ nullable: false })
  cardNo: number;

  @Column({ nullable: false })
  cvv: number;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  paymentDate: Date;

  @ManyToOne(() => Product, (product) => product.productId)
  @JoinColumn({ name: "productId" })
  productId: Product;

  @ManyToOne(() => Order, (order) => order.orderId)
  @JoinColumn({ name: "orderId" })
  orderId: Order;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.userId)
  @JoinColumn({ name: "userId" })
  userId: UserEntity;

  @OneToMany(() => Address, (address) => address.paymentId)
  address: Address[];
}
