import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import helmet from '@fastify/helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import Multipart from '@fastify/multipart';

import { AppModule } from './app.module';

const swaggerDocument = new DocumentBuilder()
  .setTitle('SH')
  .setDescription('API')
  .setVersion('1.0')
  .addTag('API')
  .build();

async function bootstrap() {
  const adapter = new FastifyAdapter({ logger: true });
  adapter.register(fastifyCookie);

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
    { cors: true },
  );

  // Register the @fastify/multipart plugin
  app.register(Multipart, {
    sharedSchemaId: 'MultipartFile',
    throwFileSizeLimit: true,
    limits: {
      files: 1,
      fileSize: 10000,
    },
  });
  app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });

  SwaggerModule.setup(
    'api',
    app,
    SwaggerModule.createDocument(app, swaggerDocument),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
