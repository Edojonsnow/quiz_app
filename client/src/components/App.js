import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// IMPORT COMPONENTS
import Quiz from "./Quiz.js";

import Login from "./Login.js";
import Dashboard from "./Dashboard.js";
import InstructionsPage from "./InstructionsPage.js";
import EndScreen from "./EndScreen.js";

import Registration from "./Registration.js";

import { GameProvider } from "./Helpers/Context.js";

// REACT ROUTERS

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/quiz",
    element: <Quiz></Quiz>,
  },
  // {
  //   path: "/faceauth",
  //   element: <Faceio></Faceio>,
  // },
  // {
  //   path: "/facereg",
  //   element: <FaceIOReg></FaceIOReg>,
  // },
  // {
  //   path: '/results',
  //   element: <Results></Results>
  // },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
  },
  {
    path: "/instructions",
    element: <InstructionsPage></InstructionsPage>,
  },
  {
    path: "/endscreen",
    element: <EndScreen></EndScreen>,
  },
  {
    path: "/register",
    element: <Registration></Registration>,
  },
]);

function App() {
  return (
    <>
      <div className="App">
        <GameProvider>
          <RouterProvider router={router} />

          {/* {gameState === "Login" && <Login/>} */}
          {/* {gameState === "Dashboard" && <Dashboard/>} */}
          {/* {gameState === "Instruction" && <InstructionsPage/>} */}
        </GameProvider>
      </div>
    </>
  );
}

export default App;
