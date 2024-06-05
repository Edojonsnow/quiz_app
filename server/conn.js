import mongoose from "mongoose";


export default async function connect(){
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.ATLAS_URI)
    console.log("Database Connected")
}