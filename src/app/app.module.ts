import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouterModule } from 'nest-router';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Routes } from './app.route';
import { AuthModule } from 'module/auth/auth.module';
import { UserModule } from 'module/user/user.module';
import { ProductModule } from 'module/product/product.module';
import { OrderModule } from 'module/order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
      synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
      logger : "debug"
    }),
    RouterModule.forRoutes(Routes),
    AuthModule,
    UserModule,
    ProductModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
