import React from "react";
import { Product_data } from "../data";
import ProductList from "../components/productComponents/ProductList";

function Cart() {
  return (
    <div>
      <h1>
        This is Cart <i class="fa-solid fa-shopping-cart"></i>
      </h1>
      <ProductList data={Product_data}></ProductList>
    </div>
  );
}

export default Cart;
