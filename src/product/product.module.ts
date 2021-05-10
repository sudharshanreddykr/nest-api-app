import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Module({
  // register the modules : features
  imports: [TypeOrmModule.forFeature([Product])],
  // register the controller
  controllers: [ProductController],
  // register the services
  providers: [ProductService],
})
export class ProductModule { }
