import React, { useState } from "react";
import "../../styles/productCard.css";
import { useNavigate } from "react-router-dom";
import settings from "../../settings.json";

const base_url = settings.base_url;

const ProductCard = ({ id, name, cost, date_of_purchase, image }) => {
  const navigate = useNavigate();
  const [notify, setNotify] = useState(true);

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
        <img src={base_url+ image.image} alt="" />
      </div>

      <h1>{name}</h1>
      <h4>Cost: &#8377;{cost}</h4>
    </div>
  );
};

export default ProductCard;
