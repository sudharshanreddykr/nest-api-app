import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import {  ApiTags } from '@nestjs/swagger';
import { ProductService } from 'src/product/product.service';

@ApiTags('order')
@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService,
    private productservice: ProductService
  ) { }

  @Post()
  create(@Request() req: any, @Body() createOrderDto: CreateOrderDto) {
    console.log("constrol user", req.user.userId)
    return this.orderService.create(req.user.userId, req.productId, createOrderDto);
  }


  
  @Get()
  findAll(@Request() req: any) {
    return this.orderService.findAll(req.user.userId);
  }

  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}

