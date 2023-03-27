// import DisplayProfile from "../components/userComponents/DisplayProfile";
import React, { useState } from "react";
import "../styles/profile.css";
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

function Profile() {
  //get data
  // return <DisplayProfile>{/* Need to give props here */}</DisplayProfile>;
  const user = JSON.parse(localStorage.getItem("profile"));
  console.log(user);
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
      <button>Logout</button>
      <div className="edit-info">
        <EditContact />
      </div>
    </div>
  );
}
export default Profile;
