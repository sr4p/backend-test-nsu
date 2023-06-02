import { Controller, Post, Request, Body,Get, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './auth.dto';
import { JwtAuthGuard } from 'guard/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private Service: AuthService) {}

    @Post('login')
    async login(@Body() body : AuthLoginDto) {
        const result = await this.Service.login(body)
        return result
    }

    @UseGuards(JwtAuthGuard)
    @Get('test')
    async test(@Request() req) {
        console.log(req.user);
        return "hi tk"
    }
}