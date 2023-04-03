import "../styles/signin.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import settings from "../settings.json";
import OTPVeify from "../components/userComponents/otpVerity";

const api_url = settings.api_url;

function SignupBackend({ profile, contact }) {
  const url = api_url + "users/signup/";
  console.log(profile);
  const data = {
    email: profile.email,
    username: profile.name,
    contact: contact,
  };

  const navigate = useNavigate();

  axios
    .post(url, data)
    .then((res) => {
      sessionStorage.setItem("authTokens", JSON.stringify(res.data["token"]));
      console.log("Added new user");
      navigate("/");
    })
    .catch((_err) => {
      console.log(_err.response.status);
      navigate("/error");
    });
}

export default function Signup() {
  //TODO: phone number verification

  const profile = JSON.parse(sessionStorage.getItem("profile"));
  const [mobile, setMobile] = useState(null);
  const getMobile = (val) => {
    setMobile(val);
  };

  return (
    <div className="signup">
      <OTPVeify getContact={getMobile} />
      {mobile && profile && (
        <SignupBackend profile={profile} contact={mobile} />
      )}
    </div>
  );
}
