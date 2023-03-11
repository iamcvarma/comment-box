import mongoose  from "mongoose"; 

const CommentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  upvotes:{
    type:Number,
    default:0
  },
  
},{ timestamps: true });

CommentSchema.add({
  replies: [CommentSchema],
});
const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
