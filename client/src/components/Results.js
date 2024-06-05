import React from 'react'
import "../styles/Result.css"
import { Link } from 'react-router-dom'
import ResultTable from './ResultTable.js'

export default function Results() {

  function onRestart(){
    console.log("restart")
  }
  return (
    <div className='container'>
      <h1 className='title'> Quiz Application</h1>
      <div className='result flex-center'>
<div className='flex'>
  <span>Username</span>
  <span className='bold'>Osahon</span>
</div>
<div className='flex'>
  <span>Username</span>
  <span className='bold'>Osahon</span>
</div>
<div className='flex'>
  <span>Username</span>
  <span className='bold'>Osahon</span>
</div>
      </div>

      <div className='start'>
<Link className='btn' to={"/"} onClick={onRestart}> Retake Quiz</Link>
      </div>
<div>
<ResultTable></ResultTable>
</div>
     

    </div>
  )
}
