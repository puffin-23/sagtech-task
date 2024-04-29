import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { options } from './config/jwt-module-async-options';
import { STRATEGIES } from './strategies';
import { GUARDS } from './guards';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ...STRATEGIES, ...GUARDS, PrismaService],
  imports: [PassportModule, JwtModule.registerAsync(options()), UserModule, ]
})
export class AuthModule {}
