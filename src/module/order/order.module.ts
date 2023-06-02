import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from 'entities/order.entity';
import { Product } from 'entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order,Product]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: String(process.env.SECRET_JWT),
      signOptions: { expiresIn: Number(process.env.SECRET_EXPIRE) },
    }),
  ],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
