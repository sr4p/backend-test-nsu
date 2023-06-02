import { HttpException, HttpStatus, Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'entities/product.entity';
import { Repository } from 'typeorm';
import { QueryProdDto } from './product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private prodRepository: Repository<Product>
    ) {}

    async create(body : any){
        try {
            const result = await this.prodRepository.save(body)
            return result
        } catch (error) {
            throw new HttpException((<{ message : string }>error).message,HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getProductList({ limit, page } : QueryProdDto){
        const result = await this.prodRepository.findAndCount({ skip : page, take : limit })
        return { count : result[1], data : result[0] }
    }

    async getProductDetail(id : number){
        const result = await this.prodRepository.findOneBy({ id })
        return result
    }
}
