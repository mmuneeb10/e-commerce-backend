import { Product } from 'src/products/entities/product.entity';

export class GetMyCartOutputDto {
  id: number;
  session: string;
  userId: number;
  totalPrice: number;
  totalItems: number;
  products: Product[];
}
