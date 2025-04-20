import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserModule } from "src/user/user.module";


@Module({
    imports: [JwtModule.register({
        secret: "n38q.30>ZA[#-T-2)%m9xiU/rwC_"
    }),
    UserModule,
    PrismaModule

    ]
})
export class AuthModule {}