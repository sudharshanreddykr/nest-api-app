import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDetailDto {

    @ApiProperty()
    Amount:number

    @ApiProperty()
    qty:number

    @ApiProperty()
    orderId:number

    @ApiProperty()
    productId:number

    @ApiProperty()
    userId:string


}