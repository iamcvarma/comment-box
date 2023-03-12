import mongoose from "mongoose";    

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    profileURL:{
        type:String,
        required:true,
    }
})
userSchema.index({ email: 1 });

const User = mongoose.model("User", userSchema);
export default User