import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@ApiTags('payment')
@Controller('payment')
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiNotFoundResponse({ description: 'No data is Created...  😿' })
  @ApiOkResponse({ description: 'Payment Data Created... 😺' })
  @Post()
  create(@Request() req:any,@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(req.user.userId,req.body.productId,req.body.orderId,createPaymentDto);
  }

  @ApiNotFoundResponse({ description: 'No data is Found...  😿' })
  @ApiOkResponse({ description: 'All Payment Data found... 😺' })
  @Get()
  findAll(@Request() req:any) {
    return this.paymentService.findAll(req.user.usrId);
  }


  @ApiNotFoundResponse({ description: 'No data is found for ID...  😿' })
  @ApiOkResponse({ description: 'Payment Data found for ID... 😺' })
  @Get(':id')
  findOne(@Request() req:any,@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @ApiNotFoundResponse({ description: 'No data is Updated...  😿' })
  @ApiOkResponse({ description: 'Payment Data Updated for ID... 😺' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }
  @ApiNotFoundResponse({ description: 'No data is Deleted...  😿' })
  @ApiOkResponse({ description: 'Payment Data Deleted for ID... 😺' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
