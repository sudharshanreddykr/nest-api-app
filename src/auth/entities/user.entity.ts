import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import * as bcrypt from "bcrypt";
import { Address } from "src/address/entities/address.entity";
import { Order } from "src/order/entities/order.entity";
import { OrderDetail } from "src/order-details/entities/order-detail.entity";
import { Payment } from "src/payment/entities/payment.entity";

@Entity({ name: "user" })
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  userId: string;

  @Column({ nullable: false })
  userName: string;

  @Column({ nullable: false })
  userEmail: string;

  @Column({ nullable: false })
  userPassword: string; // plain text password

  @Column({ type: "datetime" })
  createdAt: Date;
    @Column({ nullable: true })
  profileImage: string;

  // hooks : tasks to be executed
  // this gets executed before every insert operation
  @BeforeInsert()
  async hashPassword() {
    this.userPassword = await bcrypt.hash(this.userPassword, 10); // hashed password
  }

  // one user will have many addressess
  @OneToMany(() => Address, (address) => address.userId)
  address: Address[];

  @OneToMany(() => Order, (order) => order.userId)
  orderId: Order[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.userId)
  orderDetailId: OrderDetail[];

  @OneToMany(() => Payment, (payment) => payment.userId)
  paymentId: Payment[];
}
