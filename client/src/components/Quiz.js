import React, { useEffect, useState, useContext } from "react";
import { GameStateContext } from "./Helpers/Context.js";

import "../styles/Main.css";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [matric, setMatric, userScore, setUserScore] =
    useContext(GameStateContext);

  useEffect(() => {
    let timer;
    if (!isQuizCompleted && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    } else if (!isQuizCompleted && timeLeft === 0) {
      handleQuizSubmit();
    }

    return () => clearTimeout(timer);
  }, [isQuizCompleted, timeLeft]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Fetch all questions from the MongoDB database
        const response = await fetch("http://localhost:3002/api/questions");
        const data = await response.json();
        // Calculate the seed for randomization using the current timestamp
        const seed = Math.floor(Date.now() / 1000);

        // Randomly select 20 questions using the Linear Congruent Method
        const selectedQuestions = selectRandomQuestions(data, 20, seed);

        // Set the selected questions in the component state
        setQuestions(selectedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const sendScore = async () => {
    const quizScore = calculateScore();
    setUserScore(quizScore);
    // Send the score to the backend for storing in the database

    fetch("http://localhost:3002/scores", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        matric,
        userScore,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userscores");

        if (data.status === "ok") {
          alert("storage successful");
        }
      });
  };

  const selectRandomQuestions = (questions, count, seed) => {
    const selectedQuestions = [];

    for (let i = 0; i < count; i++) {
      // Generate a random index using the Linear Congruent Method
      seed = (seed * 1103515245 + 12345) % Math.pow(2, 31);
      const randomIndex = seed % questions.length;

      // Add the randomly selected question to the result
      selectedQuestions.push(questions[randomIndex]);

      // Remove the selected question from the pool to avoid duplicates
      questions.splice(randomIndex, 1);
    }

    return selectedQuestions;
  };

  const handleAnswerSelect = (questionId, answerId) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answerId,
    }));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };
  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question) => {
      const userAnswer = userAnswers[question._id];
      if (userAnswer && userAnswer === question.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const handleQuizSubmit = () => {
    const quizScore = calculateScore();
    setScore(quizScore);
    setIsQuizCompleted(true);

    sendScore();
  };

  if (questions.length === 0) {
    return <p>Loading questions...</p>;
  }

  const backToDashboard = () => {
    window.location.href = "./dashboard";
  };

  if (isQuizCompleted) {
    sendScore();
    return (
      <div>
        <div className="endscreen">
          <div className="endscreen-message">
            <h1>CONGRATULATIONS</h1>
            <h2>You have completed the examination</h2>
            <h2>
              You scored {score}/{questions.length}
            </h2>
            <button className="back-to-dashboard" onClick={backToDashboard}>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentQuestionIndex === questions.length) {
    return (
      <div className="container">
        <h1 className="end-exam-confirm">Are you sure you want to end exam?</h1>

        <button className="submit-button" onClick={handleQuizSubmit}>
          Submit Quiz
        </button>
        <button className="submit-prev-button" onClick={handlePrevQuestion}>
          Prev Question
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container">
      <h1 className=""> GES 101: General Knowledge </h1>
      <div className="instruction-subtitle">
        <span>Questions: {questions.length}</span>
        <span>Duration: 1 minute</span>
      </div>
      <h2 className="question-number">Question {currentQuestionIndex + 1}</h2>
      <p className="timer">Time Left: {timeLeft}</p>
      <h3>{currentQuestion.text}</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li key={option._id}>
            <label>
              <input
                type="radio"
                name={currentQuestion._id}
                value={option._id}
                onChange={() =>
                  handleAnswerSelect(currentQuestion._id, option._id)
                }
                checked={userAnswers[currentQuestion._id] === option._id}
              />
              {option.text}
            </label>
          </li>
        ))}
      </ul>
      <div className="nav-buttons">
        <button onClick={handlePrevQuestion}>Prev Question</button>
        <button onClick={handleNextQuestion}>Next Question</button>
      </div>
    </div>
  );
}
