import {Signin} from './Signin.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import  credentials from '../../credentials.json';

export function Login(){
    return(
        <GoogleOAuthProvider clientId={credentials.clientId}>
        < Signin />
        </GoogleOAuthProvider>
    );
}
