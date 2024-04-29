import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostModel } from '@prisma/client';
import { PostResponse } from './dto/post.response';
import { UserResponse } from 'src/user/response';
import { BadRequestException } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common';
import { CurrentUser } from '@app/common/decorators';
import { JwtPayload } from '@auth/interface';
 
@Controller()
export class PostController {
   constructor(
     private readonly postService: PostService) {}

  @Post('posts')
  async createPost(@Body() dto: PostResponse, user: UserResponse) {
    const post = await this.postService.createNewPost(dto, user)
    if (!user) {
       throw new BadRequestException(`Не получается не получается создать пост с данными ${JSON.stringify(dto)} так как пользователь не найден`)
    }
    return new PostResponse(post)
 }
 
  @Get('posts/:id')
   async getUser(@Param('id', ParseUUIDPipe) id: string) {
    const post = await this.postService.getPost(id)
    return new PostResponse(post)
   }
 
  @Put('posts/:id')
   async updatePost(@Body() body: Partial<PostModel>) {
    const post = await this.postService.createNewPost(body)
    return new PostResponse(post)
 }
 
  @Delete('post/:id')
   async deletePost(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: JwtPayload) {
    return this.postService.deletePost(id, user)
   }
  @Get('posts')
  async getAllPosts(): Promise<PostModel[]> {
    return this.postService.getAllPosts()
  }}