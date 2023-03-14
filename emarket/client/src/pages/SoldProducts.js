import React from "react";
import { Product_data } from "../data";
import ProductList from "../components/productComponents/ProductList";

function SoldProducts() {
  return <ProductList data={Product_data}></ProductList>;
}

export default SoldProducts;
