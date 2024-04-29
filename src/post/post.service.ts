import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Post, Prisma } from '@prisma/client';

@Injectable()
export class PostService {
   constructor(private prisma: PrismaService) {}

   async getPost(
      postWhereUniqueInput: Prisma.PostWhereUniqueInput,
    ): Promise<Post | null> {
      return this.prisma.post.findUnique({
        where: postWhereUniqueInput,
      });
    }
  
    async getAllPosts(): Promise<Post[]> {
      const posts = await this.prisma.post.findMany()
      return posts
    }
  
    async createPost(data: Prisma.PostCreateInput): Promise<Post> {
      return this.prisma.post.create({
        data,
      });
    }
  
    async updatePost(params: {
      where: Prisma.PostWhereUniqueInput;
      data: Prisma.PostUpdateInput;
    }): Promise<Post> {
      const { data, where } = params;
      return this.prisma.post.update({
        data,
        where,
      });
    }
  
    async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
      return this.prisma.post.delete({
        where,
      });
    }
}

