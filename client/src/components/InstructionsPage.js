import React from 'react'
import "../styles/Main.css"
import { useContext } from 'react';
import { GameStateContext } from './Helpers/Context.js';
import { useNavigate } from "react-router-dom";

export default function InstructionsPage() {

  const navigate = useNavigate();
    const {setGameState} = useContext(GameStateContext);

      const startExam = () =>{
        navigate("/quiz")
        
      }




    return (
        <div className='instructions-page'>
            <h1 className=''> GES101: GENERAL KNOWLEDGE</h1>
            <div className='instruction-subtitle'>
                <span >Questions: 25</span>
                <span >Duration: 10 minutes</span>
            </div>

            <div className="instructions-list">
            <h2>Examination Instructions</h2>
            <ol>
            <li className='instructions'>You are to answer all questions presented</li>
            <li className='instructions'>Select the correct answer from the options provided</li>
            <li className='instructions'>The examination lasts for a fixed duration. Once the time is up,your examination is submitted automatically.</li>
            <li className='instructions'>You are advised to keep track of your time using the timer.</li>
            </ol>
            </div>
            <button className='start-exam-button'   onClick={startExam}><span>START EXAM</span></button>

        </div>
    )
}
