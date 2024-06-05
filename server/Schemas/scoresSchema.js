import mongoose from "mongoose";

export const ScoreSchema = new mongoose.Schema({
    matric: String,
    userScore: Number,
  });

mongoose.model("UserScore",ScoreSchema);