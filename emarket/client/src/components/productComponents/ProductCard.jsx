import React, { useState } from "react";
import "../../styles/productCard.css";
import { useNavigate } from "react-router-dom";
import settings from "../../settings.json";

const base_url = settings.base_url;

const ProductCard = ({
  id,
  name,
  actual_cost,
  selling_cost,
  date_of_purchase,
  image,
}) => {
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
        <img src={base_url + image.image} alt="" />
      </div>

      <h1>{name}</h1>
      <h4>Actual Cost: &#8377;{actual_cost}</h4>
      <h4>Selling Cost: &#8377;{selling_cost}</h4>
    </div>
  );
};

export default ProductCard;
