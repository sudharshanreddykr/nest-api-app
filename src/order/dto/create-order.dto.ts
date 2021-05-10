import { ApiProperty } from '@nestjs/swagger';
export class CreateOrderDto {
    @ApiProperty({ example: 'product name' })
    amount: number;

    @ApiProperty()
    SDate: string;

    @ApiProperty()
    user: string

    @ApiProperty()
    product: number
}

