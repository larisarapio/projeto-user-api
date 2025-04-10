import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller()
export class UserController {
  @Get()
  async getUser(): Promise<any> {
    const user = {};
    return user;
  }

  @Post()
  async createUser(@Body() body: any): Promise<any> {
    return body;
  }
}
