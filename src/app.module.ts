import { Module } from '@nestjs/common';
<<<<<<< Updated upstream

@Module({
  imports: [],
=======
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST') || 'localhost',
        port: configService.get<number>('DB_PORT') || 3306,
        username: configService.get('DB_USERNAME') || 'root',
        password: configService.get('DB_PASSWORD') || 'wcggamer!',
        database: configService.get('DB_NAME') || 'todo',
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      }),
    }),
    TasksModule,
    UsersModule,
  ],
>>>>>>> Stashed changes
})
export class AppModule {}
  