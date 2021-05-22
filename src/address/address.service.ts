import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "src/auth/user/user.service";
import { OrderDetailsService } from "src/order-details/order-details.service";
import { OrderService } from "src/order/order.service";
import { PaymentService } from "src/payment/payment.service";
import { ProductService } from "src/product/product.service";
import { Repository } from "typeorm";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { Address } from "./entities/address.entity";

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address) private addressRepository: Repository<Address>,
    private userService: UserService,
    private productService: ProductService,
    private orderService: OrderService,
    private orderDetailService: OrderDetailsService,
    private paymentService: PaymentService
  ) {}
  async create(
    userId: string,
    productId: number,
    orderId: number,
    orderDetailId: number,
    paymentId: number,
    createAddressDto: CreateAddressDto
  ) {
    const user = await this.userService.findById(userId);
    const product = await this.productService.findOne(productId);
    const order = await this.orderService.findOne(orderId);
    const orderDetail = await this.orderDetailService.findOne(orderDetailId);
    const payment = await this.paymentService.findOne(paymentId);
    const { city, line1, line2, pincode, stateName, mobile } = createAddressDto;
    return this.addressRepository.save({
      city,
      line1,
      line2,
      pincode,
      stateName,
      mobile,
      userId: user,
      productId: product,
      orderId: order,
      orderDetailId: orderDetail,
      paymentId: payment,
      createdAt: new Date().toISOString(),
    });
  }

  async findAll(userId: any) {
    const user = await this.userService.findById(userId);
    return this.addressRepository.find({ where: { userId: user } });
  }

  async findOne(id: number) {
    return this.addressRepository.findOne(id).then((data) => {
      if (!data) throw new NotFoundException();
      return data;
    });
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return this.addressRepository.update(
      { id },
      {
        line1: updateAddressDto.line1,
        line2: updateAddressDto.line2,
        city: updateAddressDto.city,
        stateName: updateAddressDto.stateName,
        pincode: updateAddressDto.pincode,
        mobile: updateAddressDto.mobile,
      }
    );
  }

  remove(id: number) {
    return this.addressRepository.delete({ id: id });
  }
}
