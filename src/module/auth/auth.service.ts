import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entities/user.entity';
import { Repository } from 'typeorm';
import { AuthJWTDto, AuthLoginDto } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async validation(email: string, password: string) : Promise<AuthJWTDto | null> {
        const user = await this.userRepository.findOne({ where : { email },select: ['id','name','email','password']});
        if (user && user.comparePassword(password)) return { id: user.id, name: user.name, email: user.email } 
        return null;
    }

    async getUserById(id : number) : Promise<User> {
        const result = await this.userRepository.findOne({ where : { id },select: ['id','name','email']});
        return result
    }

    async checkUserById(id : number) : Promise<boolean> {
        const result = await this.userRepository.exist({ where : { id }});
        return result
    }

    async login({ email , password } : AuthLoginDto) {
        const payload = await this.validation(email , password);
        if (!payload) throw new NotFoundException();

        const accessToken = this.jwtService.sign(payload);
        return {
          access_token: accessToken,
          user: {
            id: payload.id,
            name: payload.name,
            email: payload.email,
          },
        };
    }
}
