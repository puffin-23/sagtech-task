import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { UserService } from 'src/user/user.service';
import { Tokens } from './interface';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
   private readonly logger = new Logger(AuthService.name)
   constructor (private readonly userService: UserService, 
      private readonly jwtservice: JwtService,
      private readonly prismaService: PrismaService) {}
   async register(dto: RegisterDto) {
      const user = await this.userService.getUser(dto.email).catch((err) => {
         this.logger.error(err)
         return null
      })
      if (user) {
         throw new ConflictException(`пользователь с таким email уже зарегистрирован`)
      }
      return this.userService.createNewUser(dto).catch(err => {
         this.logger.error(err)
         return null
      })
   }

   async login(dto: LoginDto): Promise<Tokens> {
      const user = await this.userService.getUser(dto.email).catch((err) => {
         this.logger.error(err)
         return null
      })
      if (!user || !compareSync(dto.password, user.password)) {
         throw new UnauthorizedException('Не верный логин или пароль')
      }
      const accessToken = 'Bearer ' + this.jwtservice.sign({
         id: user.is,
         email: user.email,
         role: user.roles
      })
      return { accessToken}
   }
}
