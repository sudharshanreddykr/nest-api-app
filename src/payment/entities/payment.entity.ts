import { type } from 'node:os';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { UserEntity } from 'src/auth/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity( { name: 'payment' } )
export class Payment {
    @PrimaryGeneratedColumn()
    paymentId: number;

    @Column({default: "0", type: 'decimal',precision: 10})
    paymentAmount: number;

    @Column({ type: "datetime", default: () => 'CURRENT_TIMESTAMP' })
    paymentDate: Date;

    @Column({ default: 'pending' })
    paymentStatus: string;

    @Column({ default: 'cash' })
    paymentMode: string;

    @ManyToOne( () => Order, ( order ) => order.orderId )
        @JoinColumn({name: 'orderId'})
    orderId: Order;

    @ManyToOne( () => Product, ( product ) => product.productId )
    @JoinColumn( { name: 'productId' } )
    productId: Product;

    @ManyToOne( () => UserEntity, ( userEntity ) => userEntity.userId )
    @JoinColumn( { name: 'userId' } )
    userId: UserEntity;
}
