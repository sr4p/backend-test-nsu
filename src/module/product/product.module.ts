import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from 'entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: String(process.env.SECRET_JWT),
      signOptions: { expiresIn: Number(process.env.SECRET_EXPIRE) },
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
