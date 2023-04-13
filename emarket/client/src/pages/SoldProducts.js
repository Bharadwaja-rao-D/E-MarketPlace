import React from "react";
import ProductList from "../components/productComponents/ProductList";
import DisplayData from "../components/commonComponents/DisplayData";

function SoldProducts() {
  const url = "products/sold/";
  return (
    <div className="products-display">
      <DisplayData url={url} Child={ProductList} nav_to={null} />
    </div>
  );
}

export default SoldProducts;
