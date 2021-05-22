import { OrderDetail } from "./../../order-details/entities/order-detail.entity";
import { UserEntity } from "src/auth/entities/user.entity";
import { Order } from "src/order/entities/order.entity";
import { Product } from "src/product/entities/product.entity";
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Payment } from "src/payment/entities/payment.entity";

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  line1: string;

  @Column()
  line2: string;

  @Column()
  city: string;

  @Column()
  stateName: string;

  @Column({ precision: 6 })
  pincode: number;
  @Column({ precision: 15, type: "decimal" })
  mobile: number;

  @Column({ type: "datetime" })
  createdAt: string;

  // many addresses will be for one userentity
  @ManyToOne(() => UserEntity, (user) => user.userId)
  @JoinColumn({ name: "userId" })
  userId: UserEntity;

  @ManyToOne(() => Order, (order) => order.orderId)
  @JoinColumn({ name: "orderId" })
  orderId: Order;

  @ManyToOne(() => Product, (product) => product.productId)
  @JoinColumn({ name: "productId" })
  productId: Product;

  @ManyToOne(() => OrderDetail, (orderDetail) => orderDetail.orderDetailId)
  @JoinColumn({ name: "orderDetailId" })
  orderDetailId: OrderDetail;

  @ManyToOne(() => Payment, (payment) => payment.paymentId)
  @JoinColumn({ name: "payment" })
  paymentId: Payment;
}
