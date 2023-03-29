import React from "react";

export default function ProductInfo(props) {
  return (
    <div className="productinfo">
      <h2>{props.name}</h2>
      <p>Date of purchase: {props.date_of_purchase}</p>
      <p>Actual Cost: &#8377; {props.actual_cost}</p>
      <p>Selling Cost: &#8377; {props.selling_cost}</p>
      <h3>Description:</h3>
      <p>{props.description}</p>
    </div>
  );
}
