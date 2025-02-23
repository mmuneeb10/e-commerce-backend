import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: configService.get<string>('SEQUILIZE_HOST'),
        port: configService.get<number>('SEQUILIZE_PORT'),
        username: configService.get<string>('SEQUILIZE_USER'),
        password: configService.get<string>('SEQUILIZE_PASSWORD'),
        database: configService.get<string>('SEQUILIZE_DATABASE'),
      });
      sequelize.addModels([User, Product]);
      await sequelize.sync();
      return sequelize;
    },
  },
  {
    provide: 'USERS_REPOSITORY',
    useValue: User,
  },

  {
    provide: 'PRODUCTS_REPOSITORY',
    useValue: Product,
  },
];
