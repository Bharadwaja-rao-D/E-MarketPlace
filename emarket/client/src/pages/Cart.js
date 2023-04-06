import React from "react";
import { Product_data } from "../data";
import ProductList from "../components/productComponents/ProductList";
import DisplayData from "../components/commonComponents/DisplayData";

function Cart() {
  const nav_to = "/product/";
  const url = "products/interested/";
  return (
    <div>
      <h1>
        This is Cart <i className="fa-solid fa-shopping-cart"></i>
      </h1>
      {/* <ProductList data={Product_data} nav_to={nav_to}></ProductList> */}
      <div className="products-display">
        <DisplayData url={url} Child={ProductList} nav_to="/product/" />
      </div>
    </div>
  );
}

export default Cart;
