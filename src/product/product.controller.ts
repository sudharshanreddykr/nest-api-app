import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import {ApiNotFoundResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt.guard";


@Controller("product")
// @UseGuards(JwtAuthGuard) : apply the guard to all the routes
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Post("bulk")
  createBulk() {
    return this.productService.bulkCreate();
  }

  @Get()
  findAll(
    @Query("page") page: number = 1,
    @Query("size") size: number = 20,
    @Query("serachByTerm") serachByTerm: string
  ) {
    return this.productService.findAll(page, size, serachByTerm);
  }


  @Get("search")
  findByQuery(@Query("q") query: string) {
    return this.productService.fingByQuery(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productService.remove(+id);
  }
}