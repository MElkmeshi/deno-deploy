import { Router } from "@oak/oak";
import { PostController } from "../controllers/postController.ts";

const router = new Router();

router
  .get("/posts", PostController.getPosts)
  .post("/posts", PostController.createPost)
  .get("/posts/:id", PostController.getPost)
  .put("/posts/:id", PostController.updatePost)
  .delete("/posts/:id", PostController.deletePost);

export default router;