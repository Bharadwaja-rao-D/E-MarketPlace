import React from "react";

import "../../styles/productList.css";

import ProductCard from "./ProductCard";

function ProductList(props) {
  const products = props.data;
  return (
    <>
      <div className="productlist">
        {products.map((product, index) => {
          return <ProductCard key={index} {...product}></ProductCard>;
        })}
      </div>
    </>
  );
}

export default ProductList;
