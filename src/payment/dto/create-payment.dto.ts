import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {
    @ApiProperty()
    status?:string

    @ApiProperty()
    Amount:number

    @ApiProperty()
    Date:Date

    @ApiProperty()
    userId:string

    @ApiProperty()
    productId:number

    @ApiProperty()
    orderId:number

}