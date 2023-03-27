import React, { useEffect, useState } from "react";
// import { Product_data } from "../data";
import ProductList from "../components/productComponents/ProductList";
import "../styles/homePage.css";
// import useAxios from "../utils/useAxios";
import useAxiosInstance from "../utils/useAxios";

function Home() {
  const api = useAxiosInstance();
  const url = "products/?type=buyer";
  const [product_data, setProductData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(url);
        console.log(response.data);
        setProductData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);
  return (
    <div>
      <h1>
        This is Home <i class="fa-solid fa-home"></i>
      </h1>
      <div className="products-display">
        <ProductList data={product_data}></ProductList>
      </div>
    </div>
  );
}

export default Home;
