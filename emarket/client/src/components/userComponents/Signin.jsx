import "./userStyle.css"
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Navigate } from "react-router-dom";
import useAxios from "../../utils/useAxios.js"


function SignupBackend({profile}){
    const url = 'http://localhost:8000/api/users/signup/';
    const data = {"username":profile.name, "email":profile.email, "contact": "1111111111"};

    axios
        .post(url, data)
        .then((res) => {
            localStorage.setItem('authTokens', JSON.stringify(res.data['token']))
        })
        .catch((_err) => {});
    return (
        <div>
        </div>
    );
}

function SigninBackend({profile}){
    const url = 'http://localhost:8000/api/users/signin/';
    const data = {"username":profile.name, "email":profile.email};

    axios
        .post(url, data)
        .then((res) => {
            localStorage.setItem('authTokens', JSON.stringify(res.data['token']))
        })
        .catch((_err) => {});


    return (
        <div>
        </div>
    );
}


export function Signin(){

    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState("");

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

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

    return (

        <div className='signin'>
            <div className='signin-header'>
                <h2>Welcome to</h2>
                <h2>IITH E-MarketPlace</h2>
            </div>
            <div className='signin-button'>
            <button onClick={() => login()}>Sign in with Google  </button>
            {profile && <SigninBackend profile={profile} />}
            </div>
        </div>
    );
}
