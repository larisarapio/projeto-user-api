import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {}

    async createUser (data: CreateUserDTO) {

        data.password = data.password;

        const salt = await bcrypt.genSalt();

        data.password = await bcrypt.hash(data.password, salt);
        
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

    async update(id: number, {email, name, password, birthAt, role}: UpdateUserDTO) {

        const data: any = {};
        
        const salt = await bcrypt.genSalt();

        data.password = await bcrypt.hash(data.password, salt);

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
            const salt = await bcrypt.genSalt();

            password = await bcrypt.hash(password, salt);
        }

        if(role) {
            data.role = role;
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
