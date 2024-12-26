"use client";

import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Overlay from "./Overlay";
import "../styles/style.css";


const Container: React.FC = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  return (
    <div className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}>
      <div className="form-container register-container">
        <Register />
      </div>
      <div className="form-container login-container">
        <Login />
      </div>
      <Overlay togglePanel={() => setIsRightPanelActive(!isRightPanelActive)} />
    </div>
  );
};

export default Container;
