import { AuthModule } from 'module/auth/auth.module';
import { OrderModule } from 'module/order/order.module';
import { ProductModule } from 'module/product/product.module';
import { UserModule } from 'module/user/user.module';
import { Routes as Route } from 'nest-router';

export const Routes: Route = [{
  path: '/api/v1/',
  children: [
    AuthModule,
    UserModule,
    ProductModule,
    OrderModule
  ]
}]