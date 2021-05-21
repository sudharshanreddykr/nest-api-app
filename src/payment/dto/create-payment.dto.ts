import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {
  @ApiProperty()
  status?: string;

  @ApiProperty()
  Amount: number;

  @ApiProperty()
  cardName: string;

  @ApiProperty()
  cardNo: number;

  @ApiProperty()
  cvv: number;
  @ApiProperty()
  userId: string;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  orderId: number;
}
