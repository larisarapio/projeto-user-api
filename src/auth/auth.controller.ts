import { Body, Controller, Headers, Post, Req, UseGuards } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/decorators/user.decorator";
import { Throttle, ThrottlerGuard } from "@nestjs/throttler";

@Controller('auth')
export class AuthController{

    constructor (
        private readonly authService: AuthService
    ) {}

   
    @Post('login')
    async login(@Body() {email, password}: AuthLoginDTO) {
        return this.authService.login(email, password);
    }

    @Post('register')
    async register(@Body() body: AuthRegisterDTO) {
        return this.authService.register(body);
    }

    @Post('forget')
    async forget(@Body() {email}: AuthForgetDTO) {
        return this.authService.forget(email);
    }

    @Post('reset')
    async reset(@Body() {password, token}: AuthResetDTO) {
        return this.authService.reset(password,token)
    }

    @UseGuards(AuthGuard)
    @Post('me')
    //async me(@User('email') user) {
    async me(@User() user) {
        return {user};
    }

    @UseGuards(AuthGuard)
    @Post('photo')
    async uploadPhoto(@User() user) {
        return {user};
    }

    
}