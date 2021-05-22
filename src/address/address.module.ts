import { OrderDetail } from "src/order-details/entities/order-detail.entity";
import { Module } from "@nestjs/common";
import { AddressService } from "./address.service";
import { AddressController } from "./address.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Address } from "./entities/address.entity";
import { Order } from "src/order/entities/order.entity";
import { Product } from "src/product/entities/product.entity";
import { Payment } from "src/payment/entities/payment.entity";
import { OrderService } from "src/order/order.service";
import { OrderDetailsService } from "src/order-details/order-details.service";
import { ProductService } from "src/product/product.service";
import { PaymentService } from "src/payment/payment.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Address, Order, Product, OrderDetail, Payment]),
  ],
  controllers: [AddressController],
  providers: [
    AddressService,
    OrderService,
    OrderDetailsService,
    ProductService,
    PaymentService,
  ],
})
export class AddressModule {}
