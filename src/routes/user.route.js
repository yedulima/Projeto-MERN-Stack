import { Router } from "express";
import { create, findAll, findById, update } from "../controllers/user.controller.js";
import { validId, validUser } from "../middlewares/global.middlewares.js";

const router = Router();

router.post("/create", create);

router.get("/findAll", findAll);

router.get("/:id", validId, validUser, findById);
router.patch("/update/:id", validId, validUser, update);

export default router;