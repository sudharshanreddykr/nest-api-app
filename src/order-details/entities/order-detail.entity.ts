
import { type } from 'node:os';
import { Order } from 'src/order/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity({ name: 'orderdetails' })
export class OrderDetail {
    @PrimaryGeneratedColumn()
    orderId: number;

    @Column({ default: '0' })
    productId: number;

    @Column({ default: '10' })
    quantity: number;

    @Column({ type: "datetime", default: () => 'CURRENT_TIMESTAMP' })
    orderDate: Date;

    @Column({ type: 'datetime' })
    orderShippingDate: number;

    @Column({ default: 10, type: 'decimal', precision: 2 })
    totalAmount: number;

    @Column({ default: 'pending' })
    orderStatus: string;

    @OneToMany(() => Order, (order) => order.orderId)
    order: Order[];

}
