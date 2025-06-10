import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserModule } from "src/user/user.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";


@Module({
    imports: [JwtModule.register({
        secret: "n38q.30>ZA[#-T-2)%m9xiU/rwC_"
    }),
    forwardRef(() => UserModule),
    PrismaModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}