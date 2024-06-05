import React from "react";
import "../styles/Main.css";
import { useContext, useState } from "react";

export default function Login() {
  const [matnumber, setMatNumber] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const styles = {
    popup: {
      display: open ? "flex" : "none",
    },
  };

  //   let faceio;
  // useEffect(() => {
  //     faceio = new faceIO("fioa5666");
  // }, []);

  //   const handleLogIn = async () => {
  //     try {
  //       let response = await faceio.authenticate({
  //         locale: "auto",
  //       });
  //       window.location.href = "./dashboard"

  //       console.log(` Unique Facial ID: ${response.facialId}
  //           PayLoad: ${response.payload}
  //           `);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  // function authenticateUser(){
  //     faceio.authenticate({
  //         "locale": "auto" // Default user locale
  //     }).then(userData => {
  //         console.log("Success, user identified")
  //         // Grab the facial ID linked to this particular user which will be same
  //         // for each of his successful future authentication. FACEIO recommend
  //         // that your rely on this Facial ID if you plan to uniquely identify
  //         // all enrolled users on your backend for example.
  //         console.log("Linked facial Id: " + userData.facialId)
  //         // Grab the arbitrary data you have already linked (if any) to this particular user
  //         // during his enrollment via the payload parameter of the enroll() method.
  //         console.log("Payload: " + JSON.stringify(userData.payload)) // {"whoami": 123456, "email": "john.doe@example.com"} from the enroll() example above
  //     }).catch(errCode => {
  //         handleError(errCode)
  //     })

  function handleSubmit(e) {
    e.preventDefault();

    // console.log(matnumber, password);

    fetch("http://localhost:3002/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        matnumber,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");

        if (data.status === "ok") {
          alert("login successful");

          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);

          window.location.href = "./dashboard";
        } else {
          setOpen(true);
        }
      });
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <div className="LIYP">
        <h2>LOG INTO YOUR PROFILE</h2>
      </div>
      <div className="login-card">
        <h1 className="login-title">MATRIC NUMBER</h1>
        <input
          className="matric-input "
          type="text"
          placeholder="matric number"
          onChange={(e) => setMatNumber(e.target.value)}
        ></input>

        <h4 className="user-not-found" style={styles.popup}>
          User Not Found.Try Again
        </h4>

        <h1 className="login-title">PASSWORD</h1>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button className="login-button">LOGIN</button>
      </div>
    </form>
  );
}
