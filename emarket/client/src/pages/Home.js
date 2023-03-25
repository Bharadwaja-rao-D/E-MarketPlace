import React from "react";
import { Product_data } from "../data";
import ProductList from "../components/productComponents/ProductList";
import "../styles/homePage.css";
import useAxios from "../utils/useAxios";


function Home() {
    const id = useAxios('users/', 'GET')
    console.log(id);
  return (
    <div>
      <h1>
        This is Home <i class="fa-solid fa-home"></i>
      </h1>
      <div className="products-display">
        <ProductList data={Product_data}></ProductList>
      </div>
    </div>
  );
}

export default Home;
