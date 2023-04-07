import { useAxios } from "../../utils/useAxios";
import Loading from "./Loading";
// A component that takes a component as child and loads the component or displays the loading page
//url, child component
//This component fetches the data, displays the loading page and then calls the child prop when data is recieved
export default function DisplayData({ url, Child, ...rest }) {
  const { apidata, loading, error } = useAxios(url);
  return (
    <div className="display-data">
      {loading && <Loading />}
      {apidata && <Child data={apidata} {...rest} />}
    </div>
  );
}
