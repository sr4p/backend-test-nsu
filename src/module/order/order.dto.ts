import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { EStatusOrder } from 'entities/order.entity';

export class CreateOrderDto {
    @IsNumber()
    @IsNotEmpty()
    product_id:number;

    @IsNumber()
    @IsNotEmpty()
    quantity:number;
}

export class UpdateStatusDto {
    @IsNumber()
    @IsNotEmpty()
    order_id:number;

    @IsNotEmpty()
    @IsEnum(EStatusOrder)
    status:EStatusOrder;
}