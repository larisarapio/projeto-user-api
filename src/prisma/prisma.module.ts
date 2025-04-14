import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Module({
// aqui está dizendo q ele faz para dessse modulo prima module.
  providers: [PrismaService],
  //qm usar esse módulo vai ter acesso a isso
  exports: [PrismaService]
})
export class PrismaModule {}