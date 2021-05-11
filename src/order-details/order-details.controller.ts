import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';

@Controller( 'order-details' )
  @UseGuards(JwtAuthGuard)
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

@Post()
  create(@Request() req:any,@Body() createOrderDetailDto: CreateOrderDetailDto) {
    return this.orderDetailsService.create(req.user.userId,req.orderId,req.productId,createOrderDetailDto);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.orderDetailsService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Request() req: any ,@Param('id') id: string) {
    return this.orderDetailsService.findOne(req.user.userId, +id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDetailDto: UpdateOrderDetailDto) {
    return this.orderDetailsService.update(+id, updateOrderDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderDetailsService.remove(+id);
  }
}
