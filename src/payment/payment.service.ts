import { Payment } from 'src/payment/entities/payment.entity';
import { ProductService } from './../product/product.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import {  Repository } from 'typeorm';
import { OrderService } from 'src/order/order.service';
import { UserService } from 'src/auth/user/user.service';

@Injectable()
export class PaymentService {

  constructor(
    @InjectRepository( Payment ) private paymentRepository: Repository<Payment>,
    private userService: UserService,
    private orderService: OrderService,
    private productService: ProductService,
  ) { }

  async create ( userId: string, productId: number, orderId: number, createPaymentDto: CreatePaymentDto ) {
    const user = await this.userService.findById( userId )
    const product = await this.productService.findOne( productId )
    const order = await this.orderService.findOne(orderId)
    
    const { amount, date, status } = createPaymentDto;
    return this.paymentRepository.save( {
      PaymentAmount: amount,
      paymentDate: date,
      paymentStatus: status,
      userId: user,
      productId: product,
      orderId: order
    })
  }

  async findAll ( userId: string ) {
    const user = await this.userService.findById(userId)
    return this.paymentRepository.find({where: {userId: user}});
  }

  async findOne(id: number) {
    return this.paymentRepository.findOne(id)
      .then((data) => {
        if ( !data ) throw new NotFoundException();
        return data;
      });
  }

  async update ( id: number, updatePaymentDto: UpdatePaymentDto ) {
    return this.paymentRepository.update( {paymentId: id},
      {
        paymentAmount: updatePaymentDto.amount,
        paymentDate: updatePaymentDto.date,
        paymentStatus: updatePaymentDto.status
      } ).then( ( data ) => {
        if ( !data ) throw new NotFoundException();
        return
      })
  }

  remove(id: number) {
    return this.paymentRepository.delete(id);
  }
}
