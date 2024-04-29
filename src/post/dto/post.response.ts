import { Post } from "@prisma/client";
import { Exclude } from "class-transformer";

export class PostResponse implements Post {
   id: string;
   title: string;
   content: string;
   
   @Exclude()
   userId: string;

   @Exclude()
   createdAt: Date;

   @Exclude()
   updatedAt: Date;

   constructor(post: Post) {
      Object.assign(this, post)
   }
}