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

@Controller()
export class UserController {

  @Get()
  async getUser() {
    const user = {};
    return user;
  }

  @Post()
  async createUser(@Body() {email, name, password}: CreateUserDTO) {
    return {email,name,password};
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
