import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { envs } from 'config/env';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: envs.HOST_DB ?? 'localhost',
      port: parseInt(envs.PORT_DB ?? '3306'),
      username: envs.USERNAME_DB ?? 'bartech',
      password: envs.PASSWORD_DB ?? 'Bartech[2025]',
      database: envs.DATABASE_DB ?? 'in_time_db',
      autoLoadModels: true,
      synchronize: true,
      logging: false
    }),
  ],
})
export class DatabaseModule {}
