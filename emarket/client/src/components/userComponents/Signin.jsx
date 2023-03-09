import "./userStyle.css"
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Navigate } from "react-router-dom";
import useAxios from "../../utils/useAxios.js"


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
                    .catch((err) => console.log(err));
            }

        },
        [ user ]
    );

    // // log out function to log the user out of google and set the profile array to null
    // const logOut = () => {
    //     googleLogout();
    //     setProfile(null);
    // };

    if(profile)
    {
        return <Navigate to="/home"/>
    }
    const url = '/users/signin/';
    const data = {"username":"shashank", "email":"man@gmail.com", "contact":"9999990909"};

    const {apidata, loading, error } = useAxios(url, "POST", data);
    console.log(apidata);
    return (

        <div className='signin'>
            <div className='signin-header'>
                <h2>Welcome to</h2>
                <h2>IITH E-MarketPlace</h2>
            </div>
            <div className='signin-button'>
            {/*TODO: Place your login with google button here */}
            <button onClick={() => login()}>Sign in with Google  </button>
            </div>
        </div>
    );
}
