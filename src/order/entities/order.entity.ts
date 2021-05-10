import { UserEntity } from 'src/auth/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";

@Entity({ name: 'orders' })
export class Order {
    @PrimaryGeneratedColumn()
    orderId: number;

    @Column({ nullable: false })
    orderAmount: number;

    @Column({ type: "datetime", default: () => 'CURRENT_TIMESTAMP' })
    orderDate: Date;

    @Column({ type: 'datetime', nullable: false })
    orderShippingDate: Date;

    @Column({ default: 'pending' })
    orderStatus: string;

    @ManyToOne(() => UserEntity, (user) => user.userId)
    @JoinColumn({ name: 'userId' })
    user: UserEntity;


    @ManyToOne(() => Product, (product) => product.productId)
     @JoinColumn({ name: 'productId' })
    product: Product[];

    // OneToMany (() => Payment, ( payment ) => 
    // payment.paymentId)
    // payment: Payment[];
}
