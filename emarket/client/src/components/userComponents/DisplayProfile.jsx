import React, { useState } from "react";
import "../../styles/profile.css";

function EditContact() {
  const [change, setChange] = useState(false);
  const HandleClick = () => {
    setChange(true);
  };
  if (!change) {
    return (
      <div>
        <button onClick={HandleClick}>Edit Info</button>
      </div>
    );
  } else {
    return (
      <div>Component to edit contact info Similar to one in Signup page</div>
    );
  }
}

function DisplayProfile() {
  return (
    <div className="profile">
      <div className="profile-info">
        <div className="profile-img">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="Profile Image"
          />
        </div>
        <div className="profile-text">
          <h1>John Doe</h1>
          <p>
            <span>Email &emsp;&emsp;&emsp;:</span>
            &nbsp;cs20btech11049@iith.ac.in
          </p>
          <p>
            <span>Contact No :</span> +91 9876543210
          </p>
        </div>
      </div>
      <div className="edit-info">
        <EditContact />
      </div>
    </div>
  );
}

export default DisplayProfile;
