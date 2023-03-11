import Comment from "../models/Comment.js";

import { addComment, downvote, patchComment, removeComment, upvote } from "./utils.js";

export const findCommentById = async (commentId, cb) => {
  try {
    const comments = await Comment.find({});
    const findComment = async (commentId, comments) => {
      for (const comment of comments) {
        if (comment._id.toString() === commentId) {
          cb(comment);
          await comment.save({ suppressWarning: true });
          return true;
        }
        if (comment.replies.length > 0) {
          const found = await findComment(commentId, comment.replies);
          if (found) {
            await comment.save({ suppressWarning: true });
            return true;
          }
        }
      }
      return false;
    };
    return await findComment(commentId, comments);
  } catch (err) {
    console.error(err);
    throw new Error("failed to find comment by Id");
  }
};

export const getAllComments = async (req, res) => {
  const comments = await Comment.find({});
  res.status(200).json(comments);
};

export const createNewComment = async (req, res) => {
  try {
    const { userId,content } = req.body;
    if (!userId || !content)
      return res.status(400).json({ error: "userId or content is missing" });

    const newComment = new Comment({ userId, content });

    await newComment.save();
    return res.status(201).json(await Comment.find({}));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const addNewComment = async (req, res) => {
  try {
    const { userId, content} = req.body;
    const {id:parentId} = req.params;
    if (!userId || !content)
    return res.status(400).json({ error: "userId or content is missing" });

    const newComment = new Comment({ userId, content });
    await findCommentById(parentId, addComment(newComment));
    return res.status(201).json(await Comment.find({}));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id: commentId } = req.params;

    if (!commentId)
      return res.status(400).json({ error: "commentId is missing" });

    const { content } = req.body;
    await findCommentById(commentId, patchComment(content));
    res.status(201).json(await Comment.find({}));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id: commentId } = req.params;
    if (!commentId)
      return res.status(400).json({ error: "commentId is missing" });

    await findCommentById(commentId, removeComment);

    res.status(200).json(await Comment.find({}));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const upvoteComment = async (req, res) => {
  try {
    const { id: commentId } = req.params;
    if (!commentId)
      return res.status(400).json({ error: "commentId is missing" });
    await findCommentById(commentId, upvote);
    res.status(200).json(await Comment.find({}));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


export const downvoteComment = async (req, res) => {
    try {
      const { id: commentId } = req.params;
      if (!commentId)
        return res.status(400).json({ error: "commentId is missing" });
      await findCommentById(commentId, downvote);
      res.status(200).json(await Comment.find({}));
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
  
