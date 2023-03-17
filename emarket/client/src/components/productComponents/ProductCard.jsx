import React from "react";
import "../../styles/productCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, img, name, cost }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate("/product/" + id);
  };
  return (
    <div
      className="productcard"
      onClick={() => {
        handleClick(id);
      }}
    >
      <div className="product-img">
        <img src={img} alt="" />
      </div>

      <h1>{name}</h1>
      <h4>Cost: &#8377;{cost}</h4>
    </div>
  );
};

export default ProductCard;
