import { Controller, Get, UseGuards,Request } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'guard/auth.guard';
import { AuthenticatedRequest } from 'module/auth/auth.interface';

@Controller('user')
export class UserController {
    constructor(private Service: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUserDetail(@Request() req : AuthenticatedRequest) {
        const result = await this.Service.getUserById(req.user.id)
        return result
    }

    @UseGuards(JwtAuthGuard)
    @Get('orders')
    async getOrder(@Request() req : AuthenticatedRequest) {
        const result = await this.Service.getOrder(req.user.id)
        return result
    }
}
