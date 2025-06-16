import { Router } from "express";
import { create, findAll, savedPosts, findById, update } from "../controllers/user.controller.js";
import { validId, validUser } from "../middlewares/global.middlewares.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/create", create);

router.get("/findAll", findAll);
router.get("/savedPosts", authMiddleware, savedPosts);

router.get("/:id", validId, validUser, findById);
router.patch("/update/:id", validId, validUser, update);

export default router;