import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { Like, Repository } from 'typeorm';
import { OrderService } from 'src/order/order.service';
import { UserService } from 'src/auth/user/user.service';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';


@Injectable()
export class PaymentService {

  constructor(
    @InjectRepository( Payment ) private paymentRepository: Repository<Payment>,
    private userService: UserService,
    private orderService: OrderService
  ) { }

  async create ( id: string, createPaymentDto: CreatePaymentDto ) {
    try {
      const order = await this.orderService.findAll();
    
      return this.paymentRepository.save( {
        paymentAmount: createPaymentDto.amount,
        paymentMode: createPaymentDto.paymentMode,
        order,
      } );
    } catch ( err ) {
      console.log( err );
    }
  }

  findAll() {
    return this.paymentRepository.find();
  }

  findOne(id: number) {
    return this.paymentRepository.findOne(id)
      .then((data) => {
        if ( !data ) throw new NotFoundException();
        return data;
      });
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.paymentRepository.update( id,
      {
        paymentAmount: UpdatePaymentDto.amount,
        paymentMode: UpdatePaymentDto.paymentMode,
      } );
  }

  remove(id: number) {
    return this.paymentRepository.delete(id);
  }
}
