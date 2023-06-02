import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EStatusOrder, Order } from 'entities/order.entity';
import { Product } from 'entities/product.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateStatusDto } from './order.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,

        @InjectRepository(Product)
        private prodRepository: Repository<Product>
    ) {}

    async orderRunningNumber(): Promise<string> {
        const { running_number } = await this.orderRepository.createQueryBuilder()
          .select([
            `concat(EXTRACT(YEAR FROM CURRENT_DATE)::VARCHAR,EXTRACT(MONTH FROM CURRENT_DATE)::VARCHAR,LPAD((COUNT(*)+1)::text, 5, '0')) as running_number`
          ])
          .getRawOne();
        return running_number
      }

    async create(userId : number ,body : CreateOrderDto){
        try {
            const runningNumber = await this.orderRunningNumber()
            const data = { order_number : runningNumber,quantity : body.quantity , user : { id : userId}, product : { id : body.product_id } }
            const result = await this.orderRepository.save(data)
            return result;
        } catch (error) {
            console.log(error);
            throw new HttpException((<{ message : string }>error).message,HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getOrderDetail(userId : number,orderId : number){
        const result = await this.orderRepository.findOne({ where : { id : orderId , user : { id: userId } }})
        if(!result) throw new NotFoundException()
        return result
    }

    async changeStatusOrder(userId : number,{ order_id , status } : UpdateStatusDto){
        const result = await this.orderRepository.update({ id : order_id , user : { id: userId } },{ status : EStatusOrder[status.toUpperCase()]  })
        return result
    }
    
}
