import React, { useState } from "react";
import "../../styles/alert.css";

export default function Alert({ message, onYesClick, onNoClick }) {
  const [show, setShow] = useState(true);

  const handleYesClick = () => {
    setShow(false);
    onYesClick();
  };

  const handleNoClick = () => {
    setShow(false);
    onNoClick();
  };
  if (!show) {
    return <></>;
  }
  return (
    <div className="alert-wrapper">
      <div className="alert-content">
        <p>{message}</p>
        <div className="alert-buttons">
          <button onClick={handleYesClick}>Yes</button>
          <button onClick={handleNoClick}>No</button>
        </div>
      </div>
    </div>
  );
}
