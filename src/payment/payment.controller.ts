import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import {  ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('payment')
@UseGuards(JwtAuthGuard)
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post()
  create(@Request() req: any, @Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(req.user.userId, req.orderId, createPaymentDto);
  }


  @Get()
  findAll(@Request() req: any) {
    return this.paymentService.findAll(req.user.userId);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }


  // @Get(':id')
  // findOne(@Request() req: any, @Param('id') id: string) {
  //   return this.paymentService.findOne(+id);
  // }

  @ApiNotFoundResponse({ description: 'Data Not Updated' })
  @ApiOkResponse({ description: "Data Updated Successfully" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }


  @ApiNotFoundResponse({ description: 'Data Not Deleted' })
  @ApiOkResponse({ description: "Data Deleted Successfully" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
