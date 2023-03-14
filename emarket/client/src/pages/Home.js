import React from "react";
import { Product_data } from "../data";
import ProductList from "../components/productComponents/ProductList";

function Home() {
  return (
    <div>
      <h1>This is Home</h1>
      <ProductList data={Product_data}></ProductList>
    </div>
  );
}

export default Home;
