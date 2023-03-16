import React from "react";
import "../../styles/productCard.css";
const ProductCard = ({ img, name, cost }) => {
  return (
    <div className="productcard">
      <div className="product-img">
        <img src={img} alt="" />
      </div>

      <h1>{name}</h1>
      <h4>Cost: &#8377;{cost}</h4>
    </div>
  );
};

export default ProductCard;
