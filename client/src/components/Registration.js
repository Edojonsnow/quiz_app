import React, { Component, useState, useEffect } from "react";
import "../styles/Main.css";
// import { useContext } from "react";
// import { GameStateContext } from "./Helpers/Context.js";

export default function Registration() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [matnumber, setMatnumber] = useState("");
  const [dept, setDept] = useState("");
  const [college, setCollege] = useState("");
  const [level, setLevel] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();

    console.log(fname, lname, email, matnumber, college, dept);

    fetch("http://localhost:3002/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        fname,
        lname,
        email,
        matnumber,
        college,
        dept,
        password,
        level,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          alert("Registration Successful");
        } else {
          alert("Something went wrong");
        }
      });
  };

  return (
    <form className="register" onSubmit={handlesubmit}>
      <h1>REGISTER AS A STUDENT</h1>
      <div className="registration-field">
        <label>First name</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          onChange={(e) => setFname(e.target.value)}
        />
      </div>

      <div className="registration-field">
        <label>Last name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          onChange={(e) => setLname(e.target.value)}
        />
      </div>

      <div className="registration-field">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="registration-field">
        <label>Matric Number</label>
        <input
          type="text"
          className="form-control"
          placeholder="Matric Number"
          onChange={(e) => setMatnumber(e.target.value)}
        />
      </div>

      <div className="registration-field">
        <label>College</label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g COLNAS,COLENG,COLMANS,COLENVS"
          onChange={(e) => setCollege(e.target.value)}
        />
      </div>

      <div className="registration-field">
        <label>Department</label>
        <input
          type="text"
          className="form-control"
          placeholder="Department"
          onChange={(e) => setDept(e.target.value)}
        />
      </div>

      <div className="registration-field">
        <label>Level of Study</label>
        <input
          type="number"
          className="form-control"
          placeholder="Level"
          onChange={(e) => setLevel(e.target.value)}
        />
      </div>

      <div className="registration-field">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" className="login-button">
        REGISTER
      </button>
    </form>
  );
}
