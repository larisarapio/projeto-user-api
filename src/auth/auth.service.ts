import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  private audience = 'users';
  private issuer = 'login';

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService
  
  ) {}

  async createToken(user: User) {
    return {
      acessToken: this.jwtService.sign({
        id: user.id,
        name: user.name,
        email: user.email
      }, {
        expiresIn: "7 days",
        subject: String(user.id),
        audience: this.audience,
        issuer: this.issuer,
      })
    }
  }

  checkToken(token: string) {

    try {
      const data = this.jwtService.verify(token, {
        audience: this.audience,
        issuer: this.issuer,
      });

      return data;

    } catch(e) {
      throw new BadRequestException(e);
    }
  }

  async isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (e) {
      return false;
    }
  }

  async login(email: string, password: string){

    const user = await this.prisma.user.findFirst({
      where: {
        email
      }
    });

    if(!user) {
      throw new UnauthorizedException('E-mail e/ou senha incorretos.')
    }

    if(!await bcrypt.compare(password, user.password)) {
      throw new UnauthorizedException('E-mail e/ou senha incorretos.')
    }

    return this.createToken(user);

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

    const user = await this.prisma.user.update({
      where: {
        id,
      }, 
      data: {
        password,
      }
    })

    return this.createToken(user);

  }

  async register(data: AuthRegisterDTO){
    const user = await this.userService.createUser(data);
    return this.createToken(user);

  }

}