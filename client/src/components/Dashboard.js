import React, { useState, useEffect, useContext } from "react";
import "../styles/Main.css";
import Sidebar from "./Sidebar.js";
import { useNavigate } from "react-router-dom";

import { GameStateContext } from "./Helpers/Context.js";

export default function Dashboard() {
  const [matric, setMatric] = useContext(GameStateContext);

  const navigate = useNavigate();

  const displayExamInstructions = () => {
    navigate("/instructions");
  };

  const [userData, setUserData] = useState("");

  useEffect(() => {
    fetch("http://localhost:3002/dashboard", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.data);
        setMatric(userData.matnumber);
      });
  });

  return (
    <div>
      <Sidebar />
      <h1 className="welcome-title">
        {" "}
        Welcome {userData.fname} , {userData.matnumber}
      </h1>
      <div className="dashboard-body">
        <h2>Dashboard</h2>
        <h3>Pending Examinations</h3>
        <div
          onClick={displayExamInstructions}
          className="pending-exam-card-row"
        >
          <div className="pending-exam-card">
            <h4>GES 101</h4>
            <h5>June 19, 2023 9:00 pm</h5>
          </div>
          <div className="pending-exam-card">
            <h4>GES102</h4>
            <h5>June 19, 2023 9:00 pm</h5>
          </div>
          <div className="pending-exam-card">
            <h4>GES 103</h4>
            <h5>June 19, 2023 9:00 pm</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
