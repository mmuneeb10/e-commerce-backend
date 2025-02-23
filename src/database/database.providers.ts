import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';

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
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
  {
    provide: 'USERS_REPOSITORY',
    useValue: User,
  },
];
