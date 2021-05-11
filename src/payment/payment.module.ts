import { Product } from './../product/entities/product.entity';
import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { OrderService } from '../order/order.service'
import { Order } from 'src/order/entities/order.entity';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/auth/user/user.service';
import { UserEntity } from 'src/auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Order, Product, UserEntity])],
  controllers: [PaymentController],
  providers: [PaymentService, OrderService,UserService, ProductService]
})
export class PaymentModule { }
