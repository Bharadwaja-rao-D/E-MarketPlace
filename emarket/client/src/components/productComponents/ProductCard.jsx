import React, { useState } from "react";
import "../../styles/productCard.css";
import { useNavigate } from "react-router-dom";
import Notification from "../commonComponents/Notifications";

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
        <img src={"http://localhost:8000/" + image.image} alt="" />
      </div>

      <h1>{name}</h1>
      <h4>Cost: &#8377;{cost}</h4>
      {notify && <Notification />}
    </div>
  );
};

export default ProductCard;
