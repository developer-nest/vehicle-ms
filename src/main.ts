/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { envs } from './config/envs';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'node:path';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'],
      transport: Transport.GRPC,
      options: {
        package: 'vehicle',
        protoPath: join(process.cwd(), 'dist/vehicles/vehicle.proto'),
        url: `localhost:${envs.port}`,
        loader: {
          enums: String,
        },
        //port: envs.port,
      },
    },
  );

  await app.listen();
  logger.log(`Application is running on: ${envs.port}`);
}
bootstrap();
