/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller()
export class UserController {
  @Get()
  getUser() {
    const user = {};
    return user;
  }

  @Post()
  createUser(@Body() body) {
    return body;
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body) {
    return {
      message: `Usuário ${id} atualizado!`,
      data: body,
    };
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string, @Body() body) {
    return {
      message: `Usuário ${id} deletado!`,
      data: body,
    };
  }
}
