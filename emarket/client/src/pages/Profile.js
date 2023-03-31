// import DisplayProfile from "../components/userComponents/DisplayProfile";
import React, { useState, useEffect } from "react";
import "../styles/profile.css";
import OTPVeify from "../components/userComponents/otpVerity";
import useAxiosInstance from "../utils/useAxios";
import { useNavigate } from "react-router-dom";

function EditContact() {
  const [change, setChange] = useState(false);
  const [contact, setContact] = useState(null);
  const api = useAxiosInstance();
  const url = "";
  useEffect(() => {
    async function changeContact() {
      // try {
      //   const response = await api.get(url);
      // } catch (error) {
      //   console.error(error);
      // }
      // console.log("got here");
      // console.log(contact);
      setChange(false);
    }

    changeContact();
  }, [contact]);

  const getContact = (val) => {
    setContact(val);
  };

  const handleEdit = () => {
    setChange(true);
  };
  if (!change) {
    return (
      <div>
        <button onClick={handleEdit}>Edit Info</button>
      </div>
    );
  } else {
    return (
      <div>
        <OTPVeify getContact={getContact} />
        <button
          onClick={() => {
            setChange(false);
          }}
        >
          cancel
        </button>
      </div>
    );
  }
}

function Profile() {
  const user = JSON.parse(localStorage.getItem("profile"));
  console.log(user);
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.removeItem("profile");
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
      <button onClick={Logout}>Logout</button>
      <div className="edit-info">
        <EditContact />
      </div>
    </div>
  );
}
export default Profile;
