import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';

import { AppModule } from './app.module';

async function bootstrap() {
  const adapter = new FastifyAdapter({ logger: true });
  adapter.register(fastifyCookie);

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
    { cors: true },
  );

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000, '0.0.0.0');
}

bootstrap();
