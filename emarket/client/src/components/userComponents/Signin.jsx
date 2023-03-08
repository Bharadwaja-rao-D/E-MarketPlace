import settings from '../../settings.json'
import "./userStyle.css"

const api_base_url = settings.api_url

export function Signin(){
    return (
        <div className='signin'>
            <div className='signin-header'>
                <h2>Welcome to</h2>
                <h2>IITH E-MarketPlace</h2>
            </div>
            <div className='signin-button'>
            {/*TODO: Place your login with google button here */}
            </div>
        </div>
    );
}
