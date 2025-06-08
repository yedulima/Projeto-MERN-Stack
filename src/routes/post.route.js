import { Router } from "express";
import { create, findAll, topPosts } from "../controllers/post.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", topPosts);

export default router;