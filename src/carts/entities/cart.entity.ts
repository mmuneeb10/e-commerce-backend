import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

@Table
export class Cart extends Model {
  @Column
  session: string;

  @ForeignKey(() => User)
  @Column({ allowNull: true })
  userId: number;

  @Column
  totalPrice: number;

  @Column
  totalItems: number;

  @BelongsTo(() => User)
  user: User;
}

@Table
export class CartProducts extends Model {
  @ForeignKey(() => Product)
  @Column({ allowNull: true })
  productId: number;

  @BelongsTo(() => Product)
  product: Product;

  @ForeignKey(() => Cart)
  @Column({ allowNull: true })
  cartId: number;

  @BelongsTo(() => Cart)
  cart: Cart;
}
