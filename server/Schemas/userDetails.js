import mongoose from "mongoose";

export const UserDetailsSchema = new mongoose.Schema(
    {
        fname:String,
        lname:String,
        email:String,
        matnumber:{type:String, unique:true},
        college:String,
        dept:String,
        level:Number,
        password:String
    },
    {
        collection:"UserInfo",
    }
)

mongoose.model("UserInfo",UserDetailsSchema);