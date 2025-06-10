import { Router } from "express";
import { create, findAll, findById, topPosts, searchByTitle, searchByUser, update, exclude } from "../controllers/post.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validId } from "../middlewares/global.middlewares.js";
import { validPost } from "../middlewares/post.middleware.js";

const router = Router();

router.post("/", authMiddleware, create);

router.get("/", findAll);
router.get("/top", topPosts);
router.get("/search", searchByTitle);
router.get("/byUser", authMiddleware, searchByUser);

router.get("/:id", authMiddleware, validId, validPost, findById);
router.patch("/:id", authMiddleware, validId, validPost, update);
router.delete("/:id", authMiddleware, validId, validPost, exclude);

export default router;