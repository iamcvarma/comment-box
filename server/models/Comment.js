import mongoose  from "mongoose"; 

const commentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  replies:[commentSchema],
  upvotes:{
    type:Number,
    default:0
  },
  downvotes:{
    type:Number,
    default:0
  }
  
},{ timestamps: true });

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
