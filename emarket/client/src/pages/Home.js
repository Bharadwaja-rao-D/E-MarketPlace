import React, { useEffect, useState } from "react";
import ProductList from "../components/productComponents/ProductList";
import "../styles/homePage.css";
import DisplayData from "../components/commonComponents/DisplayData";
import SearchBar from "../components/commonComponents/SearchBar";
import Pagenation from "../components/commonComponents/Pagenation";

function Home() {
  const [url, setURL] = useState("products/");

  const changeUrl = (new_url) => {
    setURL(new_url);
    // console.log(new_url);
  };

  /*
  const api = useAxiosInstance();
  const [product_data, setProductData] = useState([]);
  const {apidata, loading, error} = useAxios(url)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(url);
        setProductData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);
    */
  return (
    <div>
      <SearchBar changeUrl={changeUrl} />
      <div className="products-display">
        <DisplayData url={url} Child={ProductList} nav_to="/product/" />
      </div>
      <Pagenation changeUrl={changeUrl} />
    </div>
  );
}

export default Home;
