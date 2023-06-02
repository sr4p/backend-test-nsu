import { AuthModule } from 'module/auth/auth.module';
import { Routes as Route } from 'nest-router';

export const Routes: Route = [{
  path: '/api/v1/',
  children: [
    AuthModule
  ]
}]