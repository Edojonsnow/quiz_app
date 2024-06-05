import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import { UserDetailsSchema } from "./Schemas/userDetails.js";
import { questionSchema } from "./Schemas/questionschema.js";
import { ScoreSchema } from "./Schemas/scoresSchema.js";
import cors from "cors";
import bcrypt from "bcrypt";
import { useJwt } from "react-jwt";
import jwt from "jsonwebtoken";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());
config();

import connect from "./conn.js";
const port = process.env.PORT || 8080;

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

const User = mongoose.model("UserInfo");
const Question = mongoose.model("Question");
const UserScore = mongoose.model("UserScore");

app.post("/register", async (req, res) => {
  const { fname, lname, email, matnumber, college, dept, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const oldUser = await User.findOne({ matnumber });
    if (oldUser) {
      return res.json({ error: "User Exists" });
    }

    await User.create({
      fname,
      lname,
      email,
      matnumber,
      college,
      dept,
      password: encryptedPassword,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
    console.log(error);
  }
});

connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server connected to http://localhost:${port}`);
      });
    } catch (error) {
      console.log("Cannot connect to the server");
    }
  })
  .catch((error) => {
    console.log(error);
  });

app.post("/login", async (req, res) => {
  const { matnumber, password } = req.body;

  const user = await User.findOne({ matnumber });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ matnumber: user.matnumber }, JWT_SECRET, {
      expiresIn: "15m",
    });

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
});

app.post("/dashboard", async (req, res) => {
  const { token } = req.body;

  try {
    const user = jwt.verify(token, JWT_SECRET);
    const userMatric = user.matnumber;
    User.findOne({ matnumber: userMatric })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "ok", data: data });
      });
  } catch (error) {}
});

app.get("/api/questions", async (req, res) => {
  try {
    const questions = await Question.aggregate([
      { $sample: { size: 60 } },
      { $project: { _id: 1, text: 1, options: 1, correctAnswer: 1 } },
    ]);
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching questions" });
  }
});

//

app.post("/scores", async (req, res) => {
  try {
    const { matric, userScore } = req.body;

    await UserScore.create({
      matric,
      userScore,
    });

    res.send({ status: "ok" });
  } catch (error) {
    console.error("Error storing score:", error);
    res.status(500).json({ error: "Failed to store score. Please try again." });
  }
});
