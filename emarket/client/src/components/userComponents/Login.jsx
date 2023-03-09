import {Signin} from './Signin.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

export function Login(){
    return(
        <GoogleOAuthProvider clientId="284221404232-c2vfbtdpeq3ajq57hmn71t401i5u5ifv.apps.googleusercontent.com">
        < Signin />
        </GoogleOAuthProvider>
    );
}