import { Router } from "express";
import { create, findAll, findById, topPosts, searchByTitle, searchByUserId, update, exclude, like, addComment, deleteComment } from "../controllers/post.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validId } from "../middlewares/global.middlewares.js";
import { validPost } from "../middlewares/post.middleware.js";

const router = Router();

router.post("/", authMiddleware, create);

router.get("/", findAll);
router.get("/top", topPosts);
router.get("/search", searchByTitle);
router.get("/byUserId", authMiddleware, searchByUserId);

router.get("/:id", authMiddleware, validId, validPost, findById);
router.patch("/update/:id", authMiddleware, validId, validPost, update);
router.delete("delete//:id", authMiddleware, validId, validPost, exclude);
router.patch("/like/:id", authMiddleware, validId, validPost, like);
router.patch("/comment/:id", authMiddleware, validId, validPost, addComment);
router.patch("/comment/:id/:idComment", authMiddleware, validId, validPost, deleteComment)

export default router;