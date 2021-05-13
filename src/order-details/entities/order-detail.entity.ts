import { UserEntity } from './../../auth/entities/user.entity';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";

@Entity({ name: 'orderdetails' })
export class OrderDetail {
    @PrimaryGeneratedColumn()
    orderDetailId: number;

    @Column({type: "integer"})
    quantity: number;

    @Column( { type: 'decimal', precision: 10 } )
    amount: number

    @ManyToOne( () => Product, ( product ) => product.productId )
    @JoinColumn( { name: 'productId' } )
    productId: Product;
  
   @ManyToOne( () => Order, ( order ) => order.orderId )
    @JoinColumn({name: 'orderId'})
    orderId: Order;

    @ManyToOne(() => UserEntity, (userEntity) => userEntity.userId)
    @JoinColumn({ name: 'userId' })
    userId: UserEntity;

}
