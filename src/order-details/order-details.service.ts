import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/auth/user/user.service';
import { OrderService } from 'src/order/order.service';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { OrderDetail } from './entities/order-detail.entity';

@Injectable()
export class OrderDetailsService {

  constructor(
    @InjectRepository(OrderDetail) private orderDetailsRepository: Repository<OrderDetail>,
    private userService: UserService,
    private productService: ProductService,
    private orderService: OrderService,
    
  ) { }

  async create (userId: string, orderId: number, productId: number, createOrderDetailDto: CreateOrderDetailDto ) {
    const user = await this.userService.findById(userId)
    const order = await this.orderService.findOne(orderId )
    const product = await this.productService.findOne(productId)
      
    const { amount, quantity } = createOrderDetailDto;
    return this.orderDetailsRepository.save( {
      amount: amount,
      quantity: quantity,
      userId: user,
      orderId: order,
      productId: product
    })
  }

  async findAll ( userId: string ) {
    const user = await this.userService.findById(userId)
    return this.orderDetailsRepository.find( { where:{ userId: user }});
  }

 async findOne(userId: string, id: number) {
   return this.orderDetailsRepository.findOne( {where:{userID:userId, orderId: id}} ).then( ( data ) => {
     if ( !data ) throw new NotFoundException();
     return data;
    })
  }

  async update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    return this.orderDetailsRepository.update( { orderDetailId: id } , {
      amount: updateOrderDetailDto.amount,
      quantity: updateOrderDetailDto.quantity
    } ).then( ( data ) => {
      if( !data ) throw new NotFoundException();
      return data
    })
  }

  remove(id: number) {
    return `This action removes a #${id} orderDetail`;
  }
}
