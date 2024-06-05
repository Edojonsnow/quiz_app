import { createContext } from "react";
import React from "react";
import { useState } from 'react';
import Quiz from '../Quiz.js';
import EndScreen from '../EndScreen.js';

export const GameStateContext = createContext("");




export const GameProvider = ({children}) => {


    const [gameState, setGameState] = useState("Login");
    const [userName, setUserName] = useState("");
    const [score, setScore] = useState(0);
    const [matric , setMatric] = useState("")
    const [userScore,setUserScore] = useState("")



return (
    <GameStateContext.Provider  value={[
        gameState,
        setGameState,
        userName,
        setUserName,
        score,
        setScore,
        matric,
        setMatric,
        userScore,
        setUserScore,
        
      ]} >
        {children}
        {gameState === "playing" && <Quiz/>}
        {gameState === "finished" && <EndScreen/>}
    </GameStateContext.Provider>
)
}