import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

import settings from "../settings.json";
import { useEffect, useState } from "react";


const base_url = settings.api_url

function useAxiosInstance() {

    //Defining manually for now
    //TODO: See about context and add them ..
    const [authTokens, setAuthTokens]  =  useState( localStorage.getItem('authTokens'));

    const axiosInstance = axios.create({
        baseURL: base_url,
        headers: {Authorization: `Bearer ${authTokens?.access}`}
    });

    //It is a middleware which runs before sending the request
    axiosInstance.interceptors.request.use( async (req) => {
        const user = jwt_decode(authTokens.access);
        const isExp = dayjs.unix(user.exp).diff(dayjs()) < 1; //time now is > the exp time in the token

        if (!isExp) return req;

        //Token has expired

        console.log("experied");
        const res = await axios.post(`${base_url}/token/refresh/`, {
            refresh: authTokens.refresh
        });

        localStorage.setItem('authTokens', JSON.stringify(res.data))
        setAuthTokens(res.data)
        req.headers.Authorization = `Bearer ${res.data.access}`
        return req;
    })

    return axiosInstance
}

//Url after api/...
export default function useAxios(rel_url, method,data = {}) {
    const [apidata, setApiData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let api = useAxiosInstance();

    const fetchData = async () => {
        if (method === "GET") {
            try {
             let res = await api.get(rel_url)
             setApiData(res.data)
            } catch (error) {setError(error.status) }
        }

        else  if(method === "POST") {
            try {
             let res = await api.post(rel_url, data)
             setApiData(res.data)
            } catch (error) { setError(error.status)}
        }


        setLoading(false);
    }

    useEffect(() => {
        setTimeout(() => {
            fetchData();
        }, 0)
    }, [])


    return {apidata, loading, error};
}

