import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {}

    async createUse ({email, name, password}: CreateUserDTO) {
        
        return this.prisma.user.create({
            data: {
                email,
                name, 
                password
            },
        });
    }
 
}
