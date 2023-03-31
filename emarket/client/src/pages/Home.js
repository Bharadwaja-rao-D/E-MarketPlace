import React, { useEffect, useState } from "react";
import ProductList from "../components/productComponents/ProductList";
import "../styles/homePage.css";
import DisplayData from "../components/commonComponents/DisplayData";

function Home() {
  const url = "products/?type=buyer";

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
      <h1>
        This is Home <i className="fa-solid fa-home"></i>
      </h1>
      <div className="products-display">
       <DisplayData url={url} Child={ProductList} nav_to="/product/"  />
      </div>
    </div>
  );
}

export default Home;
