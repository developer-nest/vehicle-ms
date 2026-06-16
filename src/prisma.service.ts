/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import { PrismaClient } from 'generated/prisma/client';
import { envs } from './config/envs';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaPg({
      connectionString: envs.databaseUrl,
    });
    super({ adapter });
  }
}
