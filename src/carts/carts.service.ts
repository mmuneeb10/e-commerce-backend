import { Inject, Injectable } from '@nestjs/common';
import { Cart, CartProducts } from './entities/cart.entity';
import { GetMyCartOutputDto } from './dto/getMyCart.dto';
import { AddProductInCartInputDto } from './dto/addProductInCart.dto';
import { ProductsService } from '../products/products.service';
import { Product } from 'src/products/entities/product.entity';

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
    session: string,
    userId: number,
  ): Promise<GetMyCartOutputDto> {
    const where: any = {};
    if (userId) {
      where.userId = userId;
    } else {
      where.session = session;
    }
    const data = await this.cartsRepository.findOne({
      where,
      include: [{ model: Product, as: 'products' }],
    });

    const cartData = data?.dataValues;
    return cartData;
  }

  async addProductInCart(
    session: string,
    userId: number,
    input: AddProductInCartInputDto,
  ): Promise<void> {
    const product = await this.productsService.getProductById(input.productId);
    if (input.cartId) {
      const cart = await this.cartsRepository.findOne({
        where: { id: input.cartId },
      });
      await this.cartsRepository.update(
        {
          totalItems: cart?.dataValues?.totalItems + 1,
          totalPrice: cart?.dataValues?.totalPrice + product.price,
        },
        { where: { id: cart?.id } },
      );
      await this.cartsProductRepository.create({
        cartId: cart?.dataValues.id,
        productId: product.id,
      });
    } else {
      const cart = await this.cartsRepository.create({
        session,
        userId,
        totalItems: 1,
        totalPrice: product.price,
      });
      await this.cartsProductRepository.create({
        cartId: cart.dataValues.id,
        productId: product.id,
      });
    }
  }
}
