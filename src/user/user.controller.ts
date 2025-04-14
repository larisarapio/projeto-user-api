import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller("/users")
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser() {
    const user = {};
    return user;
  }

  @Post()
  async createUser(@Body() data: CreateUserDTO) {
    return this.userService.createUse(data);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() body) {
    return {
      message: `Usuário ${id} atualizado!`,
      data: body,
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Body() body) {
    return {
      message: `Usuário ${id} deletado!`,
      data: body,
    };
  }
}
