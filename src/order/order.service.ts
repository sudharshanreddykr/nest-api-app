import { ProductService } from 'src/product/product.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Like, Repository } from 'typeorm';
import { UserService } from 'src/auth/user/user.service';

import { request } from 'express';




@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    private userService: UserService,
    private ProductService: ProductService,
    
  ) { }


  async create(id: string,pId: number ,createOrderDto: CreateOrderDto) {
    try {
      const user = await this.userService.findById( id );
      const product1 = await this.ProductService.findOne( pId );
      return this.orderRepository.save({
        orderAmount: createOrderDto.amount,
        orderShippingDate: createOrderDto.SDate,
        user,
        product1,
        
      });
    } catch (err) {
      console.log(err);
    }
  }

  findAll() {
    return this.orderRepository.find();
  }

  findOne(id: number) {
    return
    this.orderRepository.findOne(id)
      .then((data) => {
        console.log(data);
        if (!data) throw new NotFoundException();
        return data;
      });
  }


  async update(id: number, updateOrderDto: UpdateOrderDto) {

    return this.orderRepository
      .update(id, {
        orderAmount: updateOrderDto.amount,
        orderShippingDate: updateOrderDto.SDate,
        
        
        
      })
      .then((data) => {
        return data;
      });
  }

  remove(id: number) {
    return this.orderRepository.delete({ orderId: id });
  }
}
