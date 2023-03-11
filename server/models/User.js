import mongoose from "mongoose";    

const userSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    profilePictureURL:{
        type:String,
    }
})