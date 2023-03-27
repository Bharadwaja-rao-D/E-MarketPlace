import "../styles/signin.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import settings from "../settings.json";
import useAxiosInstance from "../utils/useAxios";

function SignupBackend({ profile, contact }) {
  const url = settings.base_url + "users/signup/";
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
      localStorage.setItem("authTokens", JSON.stringify(res.data["token"]));
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

  const profile = JSON.parse(localStorage.getItem("profile"));
  const [mobile, setMobile] = useState("");
  const [otprecv, setOtprecv] = useState("");
  const [otpsent, setOtpsent] = useState("");
  const [verified, setVerified] = useState(false);
  const [msg, setMsg] = useState("");

  const send_otp = async (e) => {
    //TODO: Read about SMS2SMS api and use it here later...
    e.preventDefault();
    // setOtpsent("2345");
    const data = {
      mobile_number: mobile,
    };
    const response = await axios.post(
      settings.base_url + "generate_otp/",
      data
    );
    console.log(response);

    setMsg("OTP sent to " + mobile);
  };

  const resend_otp = (e) => {
    //TODO: Read about SMS2SMS api and use it here later...
    // Need to change this too
    e.preventDefault();
    setOtpsent("2345");
    setMsg("OTP resent to " + mobile);
  };

  const verify_otp = async (e) => {
    e.preventDefault();
    console.log("Verify otp");
    const data = {
      mobile_number: mobile,
      otp: otprecv,
    };
    const response = await axios.post(settings.base_url + "verify_otp/", data);
    if (response.status === 200) setVerified(true);
    else {
      setMsg("Invalid otp");
    }
  };

  return (
    <div className="signup">
      <p> {msg} </p>
      <div className="signup-form">
        <form onSubmit={(e) => send_otp(e)}>
          <label> Contact: </label>
          <input
            type="text"
            name="Contact"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <button> Send otp </button>
        </form>

        <form>
          <label> OTP: </label>
          <input
            type="text"
            autoComplete="off"
            name="Contact"
            value={otprecv}
            onChange={(e) => setOtprecv(e.target.value)}
          />
          <button onClick={(e) => verify_otp(e)}> Verify otp </button>
          <button onClick={(e) => resend_otp(e)}> Resend otp </button>
        </form>
      </div>
      {verified && profile && (
        <SignupBackend profile={profile} contact={mobile} />
      )}
    </div>
  );
}
