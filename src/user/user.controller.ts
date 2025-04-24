import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller("/users")
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get()
  async list() {
    return this.userService.list();
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return this.userService.show(id);
  }

  @Post()
  async createUser(@Body() data: CreateUserDTO) {
    return this.userService.createUser(data);
  }

  @Patch(':id')
  async updateUser(@Body() data: UpdateUserDTO, @Param('id', ParseIntPipe) id: number) {
      console.log('Dados recebidos:', data);
      return this.userService.update(id, data);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number, @Body() body) {
    return this.userService.deleteUser(id);
  }
}
