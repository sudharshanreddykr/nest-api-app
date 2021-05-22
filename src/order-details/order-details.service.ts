import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "src/auth/user/user.service";
import { OrderService } from "src/order/order.service";
import { ProductService } from "src/product/product.service";

import { Repository } from "typeorm";
import { CreateOrderDetailDto } from "./dto/create-order-detail.dto";
import { UpdateOrderDetailDto } from "./dto/update-order-detail.dto";
import { OrderDetail } from "./entities/order-detail.entity";

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetail)
    private orderDetailrepository: Repository<OrderDetail>,
    private userService: UserService,
    private orderService: OrderService,
    private productService: ProductService
  ) {}

  async create(
    userId: string,
    productid: number,
    orderId: number,
    createOrderDetailDto: CreateOrderDetailDto
  ) {
    const user = await this.userService.findById(userId);
    const order = await this.orderService.findOne(orderId);
    const product = await this.productService.findOne(productid);

    const { amount, qty } = createOrderDetailDto;
    return this.orderDetailrepository.save({
      orderAmount: amount,
      orderQty: qty,
      userId: user,
      orderId: order,
      productId: product,
    });
  }

  async findAll(userId: string) {
    const user = await this.userService.findById(userId);
    return this.orderDetailrepository.find({ where: { userId: user } });
  }

  findOne(id: number) {
    return this.orderDetailrepository.findOne(id).then((data) => {
      if (!data) throw new NotFoundException(); //throw new HttpException({}, 204);
      return data;
    });
  }

  async update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    return this.orderDetailrepository
      .update(
        { orderDetailId: id },
        {
          orderAmount: updateOrderDetailDto.amount,
          orderQty: updateOrderDetailDto.qty,
        }
      )
      .then((data) => {
        if (!data) throw new NotFoundException();
        return data;
      });
  }

  remove(id: number) {
    return this.orderDetailrepository.delete({ orderDetailId: id });
  }
}
