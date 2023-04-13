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
        <p>
          <i className="fa fa-exclamation-triangle"></i>
          {message}
        </p>
        <div className="alert-buttons">
          <button onClick={handleYesClick}>
            Yes <i className="fa fa-check"></i>
          </button>
          <button onClick={handleNoClick}>
            No <i className="fa fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
