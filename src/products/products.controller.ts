import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiResponse } from '@nestjs/swagger';
import { GetProductsOutputDto } from './dto/getProducts.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: [GetProductsOutputDto],
    description: 'Get Products',
  })
  async getProducts(): Promise<GetProductsOutputDto[]> {
    const res = await this.productsService.getProducts();
    return res;
  }
}
