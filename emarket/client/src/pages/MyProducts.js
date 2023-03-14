import React from "react";
import { Product_data } from "../data";
import ProductList from "../components/productComponents/ProductList";

function MyProducts() {
  return (
    <>
      <button>Add Product</button>
      <ProductList data={Product_data}></ProductList>
    </>
  );
}

export default MyProducts;
