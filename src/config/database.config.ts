import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  // host: 'database', // this is used when server is run in docker container
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'ahjsvdjhasvfd789sd6f8sadfy6tdsfyg',
  database: 'postgres',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true, // Set to false in production
};

export default config;
