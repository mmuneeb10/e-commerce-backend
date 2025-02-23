import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [DatabaseModule, ProductsModule],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
