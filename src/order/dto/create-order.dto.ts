  
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  sDate: string;

  @ApiProperty()
  status?: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  productId: number;
}