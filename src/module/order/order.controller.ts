import { Body, Controller, Post, UseGuards, Request, Get, Param, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'guard/auth.guard';
import { AuthenticatedRequest } from 'module/auth/auth.interface';
import { CreateOrderDto, UpdateStatusDto } from './order.dto';

@Controller('order')
export class OrderController {
    constructor(private Service: OrderService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createOrder(@Request() req : AuthenticatedRequest, @Body() body : CreateOrderDto) {
        const result = await this.Service.create(req.user.id,body)
        return result
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getOrderDetail(@Request() req : AuthenticatedRequest,@Param('id') id: number) {
        const result = await this.Service.getOrderDetail(req.user.id,id)
        return result
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async changeStatusOrder(@Request() req : AuthenticatedRequest,@Body() body : UpdateStatusDto) {
        const result = await this.Service.changeStatusOrder(req.user.id,body)
        return result
    }
}
