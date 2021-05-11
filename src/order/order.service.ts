import { ProductService } from 'src/product/product.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Like, Repository } from 'typeorm';
import { UserService } from 'src/auth/user/user.service';

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    private userService: UserService,
    private productService: ProductService,
  ) { }
  async create(userId: string,productId: number ,createOrderDto: CreateOrderDto) {
    try {
      const user = await this.userService.findById( userId );
      const product = await this.productService.findOne( productId );
      const { amount, shipDate, status } = createOrderDto;
      return this.orderRepository.save( {
        orderAmount: amount,
        orderShippingDate: shipDate,
        orderStatus: status,
        userId: user,
        productId:product  
      });
    } catch (err) {
      console.log(err);
    }
  }
  async findAll ( userId: string ) {
    const user = await this.userService.findById(userId)
    return this.orderRepository.find({where:{userId:user}});
  }

 findOne(id: number) {
    return this.orderRepository.findOne(id).then((data) => {
      if (!data) throw new NotFoundException(); //throw new HttpException({}, 204);
      return data;
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.orderRepository
      .update(id, {
        orderAmount: updateOrderDto.amount,
        orderShippingDate: updateOrderDto.shipDate,
        orderStatus: updateOrderDto.status,  
      })
      .then( ( data ) => {
        if ( !data ) throw new NotFoundException();
        return data;
      });
  }
  remove(id: number) {
    return this.orderRepository.delete({ orderId: id });
  }
}
