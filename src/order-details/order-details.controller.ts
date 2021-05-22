import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@ApiTags('OrderDetail')
@Controller('order-details')
@UseGuards(JwtAuthGuard)
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @ApiNotFoundResponse({ description: 'No data is Created...  😿' })
  @ApiOkResponse({ description: 'OrderDetail Data Created for ID... 😺' })
  @Post()
  create(@Request() req:any,@Body() createOrderDetailDto: CreateOrderDetailDto) {
    return this.orderDetailsService.create(req.user.userId,req.body.productId,req.body.orderId,createOrderDetailDto);
  }

  @ApiNotFoundResponse({ description: 'No data is Found..  😿' })
  @ApiOkResponse({ description: 'OrderDetail Data Found... 😺' })
  @Get()
  findAll(@Request() req:any) {
    return this.orderDetailsService.findAll(req.user.userId);
  }

  @ApiNotFoundResponse({ description: 'No data is found For ID..  😿' })
  @ApiOkResponse({ description: 'OrderDetail Data Found for ID... 😺' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderDetailsService.findOne(+id);
  }

  @ApiNotFoundResponse({ description: 'No data is Updated...  😿' })
  @ApiOkResponse({ description: 'OrderDetail Data Updated for ID... 😺' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDetailDto: UpdateOrderDetailDto) {
    return this.orderDetailsService.update(+id, updateOrderDetailDto);
  }

  @ApiNotFoundResponse({ description: 'No data is Deleted...  😿' })
  @ApiOkResponse({ description: 'orderDetail Data Deleted for ID... 😺' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderDetailsService.remove(+id);
  }
}
