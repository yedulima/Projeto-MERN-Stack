import { Router } from "express";
import { create, findAll, findById, topPosts, searchByTitle, searchByUser, update } from "../controllers/post.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validId } from "../middlewares/global.middlewares.js";
import { validPost } from "../middlewares/post.middleware.js";

const router = Router();

router.post("/", authMiddleware, create);

router.get("/", findAll);
router.get("/top", topPosts);
router.get("/search", searchByTitle);
router.get("/byUser", authMiddleware, searchByUser);

router.patch("/:id", authMiddleware, validId, validPost, update);
router.get("/:id", authMiddleware, validId, validPost, findById);

export default router;