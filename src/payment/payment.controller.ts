import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@ApiTags('payment')
@Controller('payment')
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Request() req:any,@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(req.user.userId,req.body.productId,req.body.orderId,createPaymentDto);
  }

  @Get()
  findAll(@Request() req:any) {
    return this.paymentService.findAll(req.user.usrId);
  }


  @Get(':id')
  findOne(@Request() req:any,@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
