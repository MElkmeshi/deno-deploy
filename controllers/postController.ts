import { Context, RouterContext } from "@oak/oak";
import { PostService } from "../services/postService.ts";


export class PostController {
  static async getPosts(ctx: Context) {
    try {
      const posts = await PostService.getAllPosts();
      ctx.response.status = 200;
      ctx.response.body = posts;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = { error: error };
    }
  }

  static async createPost(ctx: Context) {
    try {
      const body = ctx.request.body;
      const { title, content } = await body.json();
      if (!title || !content) {
        ctx.response.status = 400;
        ctx.response.body = { error: "Title and content are required" };
        return;
      }
      const post = await PostService.createPost(title, content);
      ctx.response.status = 201;
      ctx.response.body = post;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = { error: error };
    }
  }

  static async getPost(ctx: RouterContext<string>) {
    try {
      const id = Number(ctx.params.id);
      const post = await PostService.getPostById(id);
      
      if (!post) {
        ctx.response.status = 404;
        ctx.response.body = { error: "Post not found" };
        return;
      }

      ctx.response.status = 200;
      ctx.response.body = post;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = { error: error };
    }
  }

  static async updatePost(ctx: RouterContext<string>) {
    try {
      const id = Number(ctx.params.id);
      const body = ctx.request.body;
      const data = await body.json();
      const post = await PostService.updatePost(id, data);
      if (!post) {
        ctx.response.status = 404;
        ctx.response.body = { error: "Post not found" };
        return;
      }
      ctx.response.status = 200;
      ctx.response.body = post;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = { error: error };
    }
  }

  static async deletePost(ctx: RouterContext<string>) {
    try {
      const id = Number(ctx.params.id);
      const success = await PostService.deletePost(id);
      
      if (!success) {
        ctx.response.status = 404;
        ctx.response.body = { error: "Post not found" };
        return;
      }

      ctx.response.status = 204; // No content
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = { error: error };
    }
  }
}


