import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '@auth/interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);
    constructor(
      private readonly userService: UserService,
      private readonly configService: ConfigService) {
      super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: configService.get('JWT_SECRET')
      });
      
  }

  async validate(payload: JwtPayload) {
      const user = await this.userService.getUser(payload.id).catch(err => {
          this.logger.error(err);
          return null;
      });

      if (!user) {
          throw new UnauthorizedException();
      }

      return payload;
  }
}