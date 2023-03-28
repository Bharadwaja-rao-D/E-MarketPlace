import React from "react";

import "../../styles/productList.css";

import ProductCard from "./ProductCard";

function ProductList(props) {
  const products = props.data;
  const nav_to = props.nav_to;
  return (
    <>
      <div className="productlist">
        {products.map((product) => {
          return (
            <ProductCard
              key={product.id}
              {...product}
              nav_to={nav_to}
            ></ProductCard>
          );
        })}
      </div>
    </>
  );
}

export default ProductList;
