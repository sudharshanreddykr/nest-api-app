import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {

    @ApiProperty()
    amount: number;

    @ApiProperty()
    status ?: string;
        
    @ApiProperty()
    date: string;

    @ApiProperty()
    userId: string;

    @ApiProperty()
    productId: number;

    @ApiProperty()
    orderId: number;

    }
