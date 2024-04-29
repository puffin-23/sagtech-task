import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { AuthModule } from './auth/auth.module';

@Global()
@Module({
   providers: [PrismaService],
   exports: [PrismaService],
   imports: [AuthModule]
})
export class PrismaModule {}
