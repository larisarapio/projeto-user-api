import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {}

    async createUse (data: CreateUserDTO) {
        
        return this.prisma.user.create({
            data,
        });
    }

    async list() {

        return this.prisma.user.findMany({});
    }

    async show(id: number) {

        return this.prisma.user.findUnique({
            where: {
                id,
            }
        })
    }

    async update(id: number, {email, name, password, birthAt}: UpdateUserDTO) {

        const data: any = {};

        if(birthAt) {
            data.birthAt = new Date(birthAt);
        }

        if(email) {
            data.email = email;
        }

        if(name) {
            data.name = name;
        }

        if(password) {
            data.password = password;
        }

        return this.prisma.user.update({
            data,
            where: {
                id
            }
        });
    }

    async deleteUser(id: number) {
        return this.prisma.user.delete({
            where: {
                id,
            }
        })
    }
 
}
