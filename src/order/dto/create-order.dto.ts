import { ApiProperty } from '@nestjs/swagger';
export class CreateOrderDto {
    @ApiProperty({ example: 'product name' })
    amount: number;

    @ApiProperty()
    shipDate: string;

    @ApiProperty()
        status?: string

    @ApiProperty()
    userId: string

    @ApiProperty()
    productId: number
}

