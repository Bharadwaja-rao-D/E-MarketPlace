import "../styles/signin.css";
import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import credentials from "../credentials.json";
import settings from "../settings.json";

function SigninBackend({ profile }) {
  //console.log("in signin backend");
  const api_url = settings.api_url;
  const url = api_url + "users/signin/";
  const data = { username: profile.name, email: profile.email };

  const navigate = useNavigate();
  axios
    .post(url, data)
    .then((res) => {
      sessionStorage.setItem("authTokens", JSON.stringify(res.data["token"]));
      console.log("go to home ");
      navigate("/"); //redirect to home page
    })
    .catch((_err) => {
      navigate("/signup"); //redirect to signup page
    });
}

function SigninGoogle() {
  //console.log("in signin google");

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState("");

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  //Getting users personal info from google
  useEffect(() => {
    if (user) {
      console.log(user);
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
          localStorage.setItem("profile", JSON.stringify(res.data));
        })
        .catch((_err) => {});
    }
  }, [user]);

  return (
    <div className="signin">
      <div className="signin-header">
        <h2>Welcome to</h2>
        <h2>IITH E-MarketPlace</h2>
      </div>
      <div className="signin-button">
        <button onClick={() => login()}>Sign in with Google </button>
        {profile && <SigninBackend profile={profile} />}
      </div>
    </div>
  );
}

export default function Signin() {
  return (
    <GoogleOAuthProvider clientId={credentials.clientId}>
      <SigninGoogle />
    </GoogleOAuthProvider>
  );
}
