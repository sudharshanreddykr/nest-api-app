import { Product } from "./../../product/entities/product.entity";
import { UserEntity } from "src/auth/entities/user.entity";
import { OrderDetail } from "src/order-details/entities/order-detail.entity";
import { Payment } from "src/payment/entities/payment.entity";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "src/address/entities/address.entity";

@Entity({ name: "order" })
export class Order {
  @PrimaryGeneratedColumn({ type: "integer" })
  orderId: number;

  @Column({ type: "decimal", precision: 10 })
  orderAmount: number;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  orderDate: Date;

  @Column({ type: "date", nullable: true })
  shippingDate: string;

  @Column({ default: "pending" })
  orderStatus: string;
  @Column({ type: "integer" })
  orderQty: number;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.userId)
  @JoinColumn({ name: "userId" })
  userId: UserEntity;

  @ManyToOne(() => Product, (product) => product.productId)
  @JoinColumn({ name: "productId" })
  //@JoinTable()
  productId: Product;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.orderId)
  orderDetailId: OrderDetail[];

  @OneToMany(() => Payment, (payment) => payment.orderId)
  paymentId: Payment[];

  @OneToMany(() => Address, (address) => address.orderId)
  address: Address[];
}
