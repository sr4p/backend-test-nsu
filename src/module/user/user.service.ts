import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async getUserById(id : number) : Promise<User> {
        const result = await this.userRepository.findOne({ where : { id },select: ['id','name','email']});
        return result
    }
 
    async checkUserById(id : number) : Promise<boolean> {
        const result = await this.userRepository.exist({ where : { id }});
        return result
    }

    async getOrder(id : number) {
        const result = await this.userRepository.findOne({ where : { id },relations: ['order']})
        return result
    }
}
