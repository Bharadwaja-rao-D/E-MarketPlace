import "./userStyle.css"
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import useAxios from "../../utils/useAxios.js"
import { GoogleOAuthProvider } from '@react-oauth/google';
import  credentials from '../../credentials.json';


function SignupBackend({profile, setPresent}){
    const url = 'http://localhost:8000/api/users/signup/';
    const data = {"username":profile.name, "email":profile.email, "contact": profile.contact};

    const navigate = useNavigate();

    axios
        .post(url, data)
        .then((res) => {
            localStorage.setItem('authTokens', JSON.stringify(res.data['token']))
            console.log("Added new user");
            setPresent(true);
            navigate("/home");
        })
        .catch((_err) => {
            console.log(_err.response.status);
            navigate("/error");
        });
}

function SigninBackend({profile, setPresent}){
    //console.log("in signin backend");
    const url = 'http://localhost:8000/api/users/signin/';
    const data = {"username":profile.name, "email":profile.email};

    const navigate = useNavigate();
    axios
        .post(url, data)
        .then((res) => {
            localStorage.setItem('authTokens', JSON.stringify(res.data['token']))
            console.log("go to home ");
            setPresent(true);
            navigate("/home") //redirect to home page
        })
        .catch((_err) => {
            //TODO: Redirect to the signup page only if the error is unauthorized..
            // for other errors print it to the console
            navigate("/signup") //redirect to signup page
        });


}


function SigninGoogle(){
    //console.log("in signin google");

    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState("");
    const [present, setPresent ] = useState(false);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    //Getting users personal info from google
    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);

                    })
                    .catch((_err) => {});
            }

        },
        [ user ]
    );

    console.log(present);

    return (
        <div className='signin'>
            <div className='signin-header'>
                <h2>Welcome to</h2>
                <h2>IITH E-MarketPlace</h2>
            </div>
            <div className='signin-button'>
            <button onClick={() => login()}>Sign in with Google  </button>
            {profile && <SigninBackend profile={profile} setPresent = {setPresent}/>}
            {profile && !present && <Signup profile={profile} setPresent = {setPresent}/>}
            </div>
        </div>
    );
}

export function Signin(){
    return (
        <GoogleOAuthProvider clientId={credentials.clientId}>
         <SigninGoogle />
        </GoogleOAuthProvider>
    );
}

export function Signup({profile, setPresent}) {
    //TODO: Find a way to get profile from the SigninGoogle component...
    const data = {
        name: profile.name,
        email: profile.email,
        contact: "3456789809"
    }
    return (
        <div className='singup'>
           < SignupBackend profile={data} setPresent={setPresent}/>
        </div>
    );
}
