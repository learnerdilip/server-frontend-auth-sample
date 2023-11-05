import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import 'dotenv/config';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATBASE_PORT),
  username: process.env.DATBASE_USERNAME,
  password: process.env.POSTGRES_DB_PASSWORD,
  database: 'postgres',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true, // Set to false in production
};

export default config;
