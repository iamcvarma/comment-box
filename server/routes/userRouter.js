import express from "express";
import { getPictureURL,updateUser } from "../controllers/userHandlers.js";

const router = express.Router()

router.get("/:id",getPictureURL)
router.post("/",updateUser)

export default router