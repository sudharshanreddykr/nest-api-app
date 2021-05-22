import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBody,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt.guard";
import { AddressService } from "./address.service";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { Address } from "./entities/address.entity";

@ApiTags("Address")
@Controller("address")
@UseGuards(JwtAuthGuard)
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(@Request() req: any, @Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(
      req.user.userId,
      req.body.productId,
      req.body.orderId,
      req.body.orderDetailId,
      req.body.paymentId,
      createAddressDto
    );
  }
  @Get()
  findAll(@Request() req: any) {
    return this.addressService.findAll(req.user.usrId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.addressService.findOne(+id);
  }

  @ApiBody({ type: CreateAddressDto })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.addressService.remove(+id);
  }
}
