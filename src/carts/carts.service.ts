import { Inject, Injectable } from '@nestjs/common';
import { Cart, CartProducts } from './entities/cart.entity';
import { GetMyCartOutputDto } from './dto/getMyCart.dto';
import { AddProductInCartInputDto } from './dto/addProductInCart.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CartsService {
  constructor(
    @Inject('CARTS_REPOSITORY')
    private cartsRepository: typeof Cart,

    @Inject('CART_PRODUCTS_REPOSITORY')
    private cartsProductRepository: typeof CartProducts,
    private productsService: ProductsService,
  ) {}

  async getMyCart(
    sessionId: string,
    userId: number,
  ): Promise<GetMyCartOutputDto> {
    const where: any = {};
    if (userId) {
      where.userId = userId;
    } else {
      where.sessionId = sessionId;
    }
    const data = await this.cartsRepository.findOne(where);
    return data?.dataValues;
  }

  async addProductInCart(
    sessionId: string,
    userId: number,
    input: AddProductInCartInputDto,
  ): Promise<void> {
    const product = await this.productsService.getProductById(input.productId);
    if (input.cartId) {
        
    } else {
      const cart = await this.cartsRepository.create({
        sessionId,
        userId,
        totalItems: 1,
        totalPrice: product.price,
      });
      await this.cartsProductRepository.create({
        cartId: cart.id,
        productId: product.id,
      });
    }
  }
}
