import { Controller, Post, Request, Body,Get, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthRegisterDto } from './auth.dto';
import { JwtAuthGuard } from 'guard/auth.guard';
import { AuthenticatedRequest } from './auth.interface';

@Controller('auth')
export class AuthController {
    constructor(private Service: AuthService) {}

    @Post('login')
    async login(@Body() body : AuthLoginDto) {
        const result = await this.Service.login(body)
        return result
    }

    @Post('register')
    async register(@Body() body : AuthRegisterDto) {
        const result = await this.Service.register(body)
        return result
    }

    @UseGuards(JwtAuthGuard)
    @Get('test')
    async test(@Request() req : AuthenticatedRequest) {
        console.log(req.user);
        return "hi tk"
    }
}