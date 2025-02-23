import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as session from 'express-session';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  app.use(
    session({
      name: 'mb-express-session-id',
      secret: configService.get<string>('SESSION_SECRET', 'test-secret'),
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 60000 * 60, // 1 hour
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('E-Commerce')
    .setDescription('This is a simple e-commerce API')
    .setVersion('1.0')
    .addSecurity('bearer', {
      type: 'http',
      scheme: 'bearer',
    })
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory);
  app.enableCors({ credentials: true, origin: true });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
