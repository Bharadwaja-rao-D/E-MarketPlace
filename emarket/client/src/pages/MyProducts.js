import React from "react";
import { useNavigate } from "react-router-dom";

import { Product_data } from "../data";
import ProductList from "../components/productComponents/ProductList";
import "../styles/myproductsPage.css";

function MyProducts() {
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
      <ProductList data={Product_data}></ProductList>
    </>
  );
}

export default MyProducts;
