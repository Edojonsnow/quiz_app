import mongoose from "mongoose";

// Define the Question schema
 export const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  options: [
    {
      text: {
        type: String,
        required: true,
      },
      _id: false,
    },
  ],
  correctAnswer: {
    type: String,
    required: true,
  },
});

// Create the Question model
 mongoose.model('Question', questionSchema);

