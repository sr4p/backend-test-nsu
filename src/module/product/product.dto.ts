import { Type } from 'class-transformer';
import { IsDecimal, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min, } from 'class-validator';

export class CreateProdDto {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsNumber()
    @IsNotEmpty()
    price:number;

    @IsString()
    @IsNotEmpty()
    description: string;
}

export class QueryProdDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    limit  = 10;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page = 1;
}