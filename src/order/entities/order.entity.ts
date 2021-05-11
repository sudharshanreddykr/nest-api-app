import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { UserEntity } from 'src/auth/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn , OneToMany} from "typeorm";
import { Payment } from 'src/payment/entities/payment.entity';

@Entity({ name: 'order' })
export class Order {
    @PrimaryGeneratedColumn()
    orderId: number;

    @Column({ type:"decimal", precision:10 })
    orderAmount: number;

    @Column({ type: "datetime", default: () => 'CURRENT_TIMESTAMP' })
    orderDate: Date;

    @Column({ type: 'date', nullable: true })
    orderShippingDate: string;

    @Column({ default: 'pending' })
    orderStatus: string;

    @ManyToOne(() => UserEntity, (userEntity) => userEntity.userId)
    @JoinColumn({ name: 'userId' })
    userId: UserEntity;


    @ManyToOne(() => Product, (product) => product.productId)
     @JoinColumn({ name: 'productId' })
    productId: Product

    @OneToMany(()=>Payment,(payment)=>payment.orderId)
    paymentId:Payment[];

  @OneToMany(()=>OrderDetail,(orderDetail)=>orderDetail.orderId)
    orderDetailId:OrderDetail[];
}
