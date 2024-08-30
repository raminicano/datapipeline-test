import { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm';

export const databaseConfig: DataSourceOptions = {
  type: 'mysql', // DB 종류에 따라 변경
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1234',
  database: 'sns',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};

// DataSource 인스턴스 생성 및 export
export const dataSource = new DataSource(databaseConfig);
