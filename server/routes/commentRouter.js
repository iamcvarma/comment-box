import express from "express";
import {
  getAllComments,
  createNewComment,
  addNewComment,
  updateComment,
  deleteComment,
  upvoteComment,
  downvoteComment
} from "../controllers/commentHandlers.js";

const router = express.Router();

router.get("/", getAllComments);
router.post("/", createNewComment);
router.post("/:id",addNewComment)
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);
router.patch("/:id/upvote", upvoteComment);
router.patch('/:id/downvote',downvoteComment)

export default router;
