require('dotenv').config();

import * as path from 'path';

import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

import { entities } from './database-entities';
import { MainSeeder } from '../../database/run-seeder';

export const ormOptions: DataSourceOptions & SeederOptions = {
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities,
  migrations: [path.join(__dirname, '../../database/migrations/*{.ts,.js}')],
  synchronize: false,
  logging: false,
  seeds: [MainSeeder],
};

export const AppDataSource = new DataSource(ormOptions);
