import express from "express";
import { getUser,updateUser } from "../controllers/userHandlers.js";

const router = express.Router()

router.get("/:id",getUser)
router.post("/",updateUser)

export default router