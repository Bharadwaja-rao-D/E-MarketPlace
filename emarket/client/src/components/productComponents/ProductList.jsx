import React, { useState } from "react";
import "../../styles/productList.css";
import { useNavigate } from "react-router-dom";
import settings from "../../settings.json";
import Notification from "../commonComponents/Notification";

const base_url = settings.base_url;

const ProductCard = ({
  id,
  name,
  actual_cost,
  selling_cost,
  date_of_purchase,
  image,
  nav_to,
}) => {
  const navigate = useNavigate();
  const [notify, setNotify] = useState(true);

  const handleClick = (id) => {
    navigate(nav_to + id);
  };
  return (
    <div
      className="productcard"
      onClick={() => {
        handleClick(id);
      }}
    >
      <Notification count={0} />
      <div className="product-img">
        {image && <img src={base_url + image.image} alt="" />}
      </div>

      <h1>{name}</h1>
      <h4>Actual Cost: &#8377;{actual_cost}</h4>
      <h4>Selling Cost: &#8377;{selling_cost}</h4>
    </div>
  );
};

// export default ProductCard;

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
