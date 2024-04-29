import { JwtPayload } from '@auth/interface';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { genSaltSync, hashSync } from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class UserService {
   constructor(private readonly prismaService: PrismaService) {}
   createNewUser(user: Partial<User>) {
      if (user.id !== user.id && user.roles.includes(Role.ADMIN)) {
         throw new ForbiddenException()
      }
      const hashedPassword = this.hashPassword(user.password)
      return this.prismaService.user.create({
         data: {
            email: user.email,
            password: hashedPassword,
            roles: user.roles,
         }
      })
   }

   getUser(id: string, user?: JwtPayload) {
      if (user.id !== id && user.roles.includes(Role.ADMIN)) {
         throw new ForbiddenException()
      }
      return this.prismaService.user.findFirst({where:{ id }})
   }

   getAll() {}

   deleteUser(id: string, user: JwtPayload) {
      if (user.id !== id && user.roles.includes(Role.ADMIN)) {
         throw new ForbiddenException()
      }
      return this.prismaService.user.delete({where: { id }, select: {id: true}})
   }

   private hashPassword(password: string) {
      return hashSync(password, genSaltSync(10))
   }




}
