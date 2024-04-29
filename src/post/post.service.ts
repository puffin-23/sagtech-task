import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Post, Prisma, User } from '@prisma/client';
import { ForbiddenException } from '@nestjs/common';
import { JwtPayload } from '@auth/interface';
import { Role } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}
  createNewPost(post: Partial<Post>, user?: Partial<User>) {
     if (user.id !== user.id) {
        throw new ForbiddenException()
     }
     return this.prismaService.post.create({
        data: {
           title: post.title,
           content: post.content,
           userId: user.id,
        }
     })
  }
  getPost(id: string) {
    return this.prismaService.post.findFirst({where:{ id }})
 }

  deletePost(id: string, user: JwtPayload) {
    if (user.id !== id && user.roles.includes(Role.ADMIN)) {
      throw new ForbiddenException()
    }
    return this.prismaService.user.delete({where: { id }, select: {id: true}})
  }
  getAllPosts(): Promise<Post[]> {
    const posts = this.prismaService.post.findMany()
      return posts
    }
  }


