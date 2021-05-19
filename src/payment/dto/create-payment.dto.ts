import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {

    @ApiProperty()
    amount: number;

    @ApiProperty()
    userId: string;
     
     @ApiProperty()
     paymentDate: Date;
    
    @ApiProperty()
    Cname: string;

    @ApiProperty()
    cardNo: number;

    // @ApiProperty()
    // exDate: string;

    @ApiProperty()
    cvv: number;

    @ApiProperty()
    orderId: number;

}
