import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { OrderService } from '../order/order.service'
import { Order } from 'src/order/entities/order.entity';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/entities/product.entity';
import { UserService } from 'src/auth/user/user.service';
import { UserEntity } from 'src/auth/entities/user.entity';
import { OrderController } from 'src/order/order.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Order, UserEntity, Product])],
  controllers: [PaymentController],
  providers: [PaymentService, OrderService, UserService, ProductService]
})
export class PaymentModule { }
