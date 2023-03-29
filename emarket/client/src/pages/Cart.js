import React from "react";
import { Product_data } from "../data";
import ProductList from "../components/productComponents/ProductList";

function Cart() {
  const nav_to = "/product/";
  return (
    <div>
      <h1>
        This is Cart <i className="fa-solid fa-shopping-cart"></i>
      </h1>
      <ProductList data={Product_data} nav_to={nav_to}></ProductList>
    </div>
  );
}

export default Cart;
