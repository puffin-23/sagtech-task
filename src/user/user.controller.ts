import { Controller, Get, Post, Body, Put, Delete, Param, ParseUUIDPipe, UseInterceptors, ClassSerializerInterceptor} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel} from '@prisma/client';
import { UserResponse } from './response';
import { CurrentUser } from '@app/common/decorators';
import { JwtPayload } from '@auth/interface';
import { User } from '@prisma/client';

@Controller()
export class UserController {
   constructor(private readonly userService: UserService ) {}

   //@Get('users')
   //async getAllUsers() {}

   @UseInterceptors(ClassSerializerInterceptor)
   @Get('users/:id')
   async getUser(@Param('id') userId: string) {
      const user = await this.userService.getUser(userId)
      return new UserResponse(user)
   }

   @Put('users/:id')
   async updateUser(@Body() body: Partial<User>) {
      const user = await this.userService.createNewUser(body)
      return new UserResponse(user)
   }

   @UseInterceptors(ClassSerializerInterceptor)
   @Delete('users/:id')
   async deleteUser(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: JwtPayload) {
    return this.userService.deleteUser(id, user)
   }



}
