import { type } from 'node:os';
import { UserEntity } from 'src/auth/entities/user.entity';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, OneToOne, ManyToMany } from "typeorm";

@Entity({ name: 'payment' })
export class Payment {
    @PrimaryGeneratedColumn()
    paymentId: number;

    @Column({type: "decimal", default: 0, precision:10 })
    paymentAmount: number;

    @Column({ type: "datetime", default: () => 'CURRENT_TIMESTAMP' })
    paymentDate: Date;

    @Column({ default: 'pending' })
    paymentStatus: string;

    @Column({ nullable:false, default: "card" })
    Cname: string;
    
    @Column({  nullable:false, precision:16, type: 'varchar' })
    cardNo?: number;
    default: "1234567891234567";
   
    // @Column({  })
    // expiration?: string;

    @Column({  nullable:false })
    cvv: number;



    @ManyToOne(() => UserEntity, (userEntity) => userEntity.userId)
    @JoinColumn({ name: 'userId' })
    userId: UserEntity;

    @ManyToOne(() => Order, (order) => order.orderId)
    @JoinColumn({ name: 'orderId' })
    orderId: Order[];


}
