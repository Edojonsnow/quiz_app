import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom'
import { GameStateContext } from "./Helpers/Context.js";
import   {Questions} from "./Questions.js"


   const EndScreen = () => {
const {score,setScore, setGameState} = useContext(GameStateContext)
  const navigate = useNavigate()
 const backToDashboard = ()=>{
   navigate("/dashboard")
 }


 



  return (
    <div className="endscreen"> 
    <div><h1>CSC 501 : INTRODUCTION TO COMPUTER NETWORKS</h1></div>
    <div className="endscreen-message">
    <h1>
       CONGRATULATIONS
    </h1>
    <h2>You have completed the examination</h2>
    <h2>You scored {score}/{Questions.length - 11}</h2>
    <button className="back-to-dashboard" onClick={backToDashboard}>Back to Dashboard</button>
    </div>
   </div>
  )
}
export default EndScreen;