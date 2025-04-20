import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
  
  ) {}

  async createToken(payload: any) {
    //return this.jwtService.signAsync(payload); // Melhor usar signAsync
  }

  async checkToken(token: string) {
    // try {
    //   return await this.jwtService.verifyAsync(token); // Melhor usar verifyAsync
    // } catch (err) {
    //   throw new Error('Invalid token');
    // }
  }

  async login(email: string, password: string){

    const user = await this.prisma.user.findFirst({
      where: {
        email, 
        password
      }
    });

    if(!user) {
      throw new UnauthorizedException('E-mail e/ou senha incorretos.')
    }

    return user;

  }

  async forget(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email
      }
    });

    if(!user) {
      throw new UnauthorizedException('E-mail está incorreto.')
    }

    //todo: enviar o email]

    return true;

  }

  async reset(password: string, token: string) {

    //todo: validar o token...

    const id = 0;

    await this.prisma.user.update({
      where: {
        id,
      }, 
      data: {
        password,
      }
    })

  }

}