import React from 'react'
import {SidebarData} from "./SidebarData.js"
import "../styles/Main.css"

export default function Sidebar() {
  return (
    <div className ="sidebar">
      {SidebarData.map((val,key) => {
      return (
        
        <li className='row' key={key} onClick ={()=>{window.location.pathname = val.link}} >
          <div>{val.icon}</div>
          <div>{val.title}</div>
        </li>
      )
       
      })}
    </div>
  )
}
