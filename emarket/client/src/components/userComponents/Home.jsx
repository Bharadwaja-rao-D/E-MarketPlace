import "./userStyle.css";
import useAxios from "../../utils/useAxios"

export function Home()
{
    const {apidata, loading, error} = useAxios("users/", "GET")
    return(
        <div>
        </div>
    );
}
