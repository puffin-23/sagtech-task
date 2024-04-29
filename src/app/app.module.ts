import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/user/user.module';
import { ConfigModule } from '@nestjs/config';
import config from '../config'
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { PostModule } from 'src/post/post.module';
import { AuthModule } from '@auth/auth.module';

@Module({
  imports: [UserModule, PostModule, AuthModule, ConfigModule.forRoot({
    isGlobal: true,
    load: [config]
  })],
  controllers: [AppController],
  providers: [AppService,  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },],
})
export class AppModule {}
