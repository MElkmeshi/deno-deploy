import { Post } from "../types/post.ts";
import { kv } from "../config/db.ts";

export class PostService {
  private static getNextId = async (): Promise<number> => {
    const counterKey = ["posts_counter"];
    const counter = await kv.get<number>(counterKey);
    const nextId = (counter.value || 0) + 1;
    await kv.set(counterKey, nextId);
    return nextId;
  };

  static async getAllPosts(): Promise<Post[]> {
    const posts: Post[] = [];
    const entries = kv.list<Post>({ prefix: ["posts"] });
    
    for await (const entry of entries) {
      posts.push(entry.value);
    }
    
    return posts.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  static async createPost(title: string, content: string): Promise<Post> {
    const id = await this.getNextId();
    const timestamp = new Date().toISOString();
    
    const post: Post = {
      id,
      title,
      content,
      timestamp,
    };

    await kv.set(["posts", id], post);
    return post;
  }

  static async getPostById(id: number): Promise<Post | null> {
    const post = await kv.get<Post>(["posts", id]);
    return post.value || null;
  }

  static async updatePost(id: number, data: Partial<Post>): Promise<Post | null> {
    const existingPost = await this.getPostById(id);
    if (!existingPost) return null;

    const updatedPost: Post = {
      ...existingPost,
      ...data,
      id, // Ensure ID doesn't change
      timestamp: new Date().toISOString(), // Update timestamp
    };

    await kv.set(["posts", id], updatedPost);
    return updatedPost;
  }

  static async deletePost(id: number): Promise<boolean> {
    const post = await this.getPostById(id);
    if (!post) return false;

    await kv.delete(["posts", id]);
    return true;
  }
}

