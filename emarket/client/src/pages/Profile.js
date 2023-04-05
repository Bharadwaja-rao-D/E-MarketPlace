// import DisplayProfile from "../components/userComponents/DisplayProfile";
import React, { useState, useEffect } from "react";
import "../styles/profile.css";
import { useNavigate } from "react-router-dom";
import EditContact from "../components/userComponents/EditContact";

function Profile() {
  const user = JSON.parse(sessionStorage.getItem("profile"));
  console.log(user);
  const navigate = useNavigate();
  const Logout = () => {
    sessionStorage.removeItem("profile");
    navigate("/signin");
    // console.log("LOGOUT");
  };
  return (
    <div className="profile">
      <div className="profile-info">
        <div className="profile-img">
          <img src={user.picture} alt="Profile Image" />
        </div>
        <div className="profile-text">
          <h1>{user.name}</h1>
          <p>
            <span>Email :</span>
            {user.email}
          </p>
          <p>
            <span>Contact No :</span> should get by API call
          </p>
        </div>
      </div>
      <button onClick={Logout} className="logout-btn">
        Logout <i className="fa fa-sign-out"></i>
      </button>
      <div className="edit-info">
        <EditContact />
      </div>
    </div>
  );
}
export default Profile;
