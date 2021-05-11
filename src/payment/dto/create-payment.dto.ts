import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {

    @ApiProperty()
    amount: number;

    @ApiProperty()
    status ?: string;
        
    @ApiProperty()
    date: Date;

    @ApiProperty()
    userId: string;

    @ApiProperty()
    productId: number;

    @ApiProperty()
    orderId: number;

    }
