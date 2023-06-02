import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from 'guard/auth.guard';
import { CreateProdDto, QueryProdDto } from './product.dto';

@Controller('product')
export class ProductController {
    constructor(private Service: ProductService) {}

    @UseGuards(JwtAuthGuard)
    @Get('list')
    async getProductList(@Query() query : QueryProdDto) {
        const result = await this.Service.getProductList(query)
        return result
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getProductDetail(@Param('id') id: number) {
        const result = await this.Service.getProductDetail(id)
        return result
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createProduct(@Body() body : CreateProdDto) {
        const result = await this.Service.create(body)
        return result
    }
}
