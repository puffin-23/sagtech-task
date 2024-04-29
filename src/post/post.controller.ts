import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostModel } from '@prisma/client';
 
@Controller()
export class PostController {
   constructor(
     private readonly postService: PostService,
   ) {}
 
   @Get('posts/:id')
   async getPostById(@Param('id') id: string): Promise<PostModel> {
     return this.postService.getPost({ id: Number(id) });
   }
 
   @Get('posts')
   async getAllPosts(): Promise<PostModel[]> {
     return this.postService.getAllPosts()
   }
 
   @Post('posts')
   async create(
     @Body() postData: { title: string; content?: string; userId: number },
   ): Promise<PostModel> {
     const { title, content, userId } = postData;
     return this.postService.createPost({
       title,
       content
     });
   }
 
   @Put('publish/:id')
   async publishPost(@Param('id') id: string): Promise<PostModel> {
     return this.postService.updatePost({
       where: { id: Number(id) },
       data: { : true },
     });
   }
 
   @Delete('post/:id')
   async deletePost(@Param('id') id: string): Promise<PostModel> {
     return this.postService.deletePost({ id: Number(id) });
   }
 }