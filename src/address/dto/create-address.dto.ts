import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty()
  @IsNotEmpty()
  line1: string;

  @ApiProperty()
  @IsNotEmpty()
  line2: string;

  @ApiProperty()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  state: string;

  @ApiProperty()
  pincode: number;

  @ApiProperty()
  userId: number;

    @ApiProperty()
  productId: number;

  @ApiProperty()
  orderId: number;

  @ApiProperty()
  orderDetailId: number;

  @ApiProperty()
  paymentId: number;
}
