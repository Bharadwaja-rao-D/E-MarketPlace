import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Product_data } from "../data";
import ProductList from "../components/productComponents/ProductList";
import "../styles/myproductsPage.css";
import useAxiosInstance from "../utils/useAxios";

function MyProducts() {
  const [myproducts_data, setProductData] = useState([]);
  const api = useAxiosInstance();
  const url = "products/?type=seller";
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
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/addproduct");
  };
  return (
    <>
      <div className="btn-cont">
        <button onClick={() => handleClick()} className="addbutton">
          <span class="addbuttonspan">Add Product</span>
        </button>
      </div>
      <ProductList data={myproducts_data}></ProductList>
    </>
  );
}

export default MyProducts;
