import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
    },
  });
  // const appMicroservice =
  //   await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  //     transport: Transport.REDIS,
  //     options: {
  //       host: 'localhost',
  //       port: 6379,
  //     },
  //   });
  await app.listen(3001);
  await app.startAllMicroservices();

  // await appMicroservice.listen();
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
