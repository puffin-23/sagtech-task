import { BadRequestException, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { AuthService } from './auth.service';
import { Public } from '@app/common/decorators';
import { UserResponse } from 'src/user/response';

@Public()
@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}
   
   @UseInterceptors(ClassSerializerInterceptor)
   @Post('register')
   async register(@Body() dto: RegisterDto) {
      const user = await this.authService.register(dto)
      if (!user) {
         throw new BadRequestException(`Не получается зарегистрировать пользователя с данными ${JSON.stringify(dto)}`)
      }
      return new UserResponse(user)
   }

   @Post('login')
   async login(@Body() dto: LoginDto) {
      const tokens = await this.authService.login(dto)
      if (!tokens) {
         throw new BadRequestException(`Не получается войти с данными ${JSON.stringify(dto)}`)
      }
      return { accessToken: tokens.accessToken}
   }

}
