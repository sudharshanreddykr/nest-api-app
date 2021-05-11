import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDetailDto {
    @ApiProperty()
    amount: number

    @ApiProperty()
    quantity: number

    @ApiProperty()
    orderId: number

    @ApiProperty()
    productId: number

    @ApiProperty()
    userId: number

}