import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const sequelizeConfig: SequelizeModuleOptions = {
  dialect: 'mysql',
  host: process.env.HOST_DB ?? 'localhost',
  port: parseInt(process.env.PORT_DB ?? '3306'),
  username: process.env.USERNAME_DB ?? 'bartech',
  password: process.env.PASSWORD_DB ?? 'Bartech[2025]',
  database: process.env.DATABASE_DB ?? 'in_time_db',
  autoLoadModels: true,
  synchronize: true,
  logging: false,
};
