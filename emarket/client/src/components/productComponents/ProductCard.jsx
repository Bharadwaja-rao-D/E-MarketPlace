import React from "react";
import "../../styles/ProductCard.css";
const ProductCard = ({ img, name, cost }) => {
  return (
    <div className="productcard">
      <img src={img} alt="" />
      <h1>{name}</h1>
      <h4>Cost: &#8377;{cost}</h4>
    </div>
  );
};

export default ProductCard;
