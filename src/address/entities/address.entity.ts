import { Order } from 'src/order/entities/order.entity';
import { JoinColumn } from 'typeorm';
import { UserEntity } from 'src/auth/entities/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import {OrderDetail} from "src/order-details/entities/order-detail.entity"

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
  state: string;

  @Column({ precision: 6 })
  pincode?: number;

  @Column({ type: 'datetime' })
  createdAt: string;

  //many addresses will be for one userentity
  @ManyToOne(() => UserEntity, (user) => user.userId)
  userId: UserEntity;

   @ManyToOne(() => Order, (order) => order.orderId)
  @JoinColumn({ name: "orderId" })
  orderId: Order;

  @ManyToOne(() => Product, (product) => product.productId)
  @JoinColumn({ name: "productId" })
  productId: Product;

  @ManyToOne(() => OrderDetail, (OrderDetail) => OrderDetail.orderDetailId)
  @JoinColumn({ name: "orderDetailId" })
  orderDetailId: OrderDetail;

  @ManyToOne(() => Payment, (payment) => payment.paymentId)
  @JoinColumn({ name: "payment" })
  paymentId: Payment;
}
