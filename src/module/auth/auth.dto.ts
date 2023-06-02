import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AuthJWTDto {
    @IsNumber()
    id:number;

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    email: string;
}

export class AuthLoginDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string
}

export class AuthRegisterDto {
    @IsString()
    @IsNotEmpty()
    name:string;
    
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string
}