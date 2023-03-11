import Comment from "../models/Comment";

export const getAllComments = async (req,res)=>{
    const comments = await Comment.find({})
    res.status(200).json(comments)
}

export const createNewComment = async (req,res) =>{
    try{
        const {userId,content} = req.body;
        if (!userId) return res.status(400).json({error:"userId is missing"})
    
        const newComment = new Comment({userId,content})
        await newComment.save()
        res.status(201).json(newComment)
    } catch(err){
        return res.status(500).json({errir:err})
    }

}