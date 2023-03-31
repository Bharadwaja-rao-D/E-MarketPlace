import React from "react";

export default function SellerInfo(props) {
  return (
    <div className="sellerinfo">
      <h2>Seller Name:{props.username}</h2>
      <h3>Email ID: {props.email}</h3>
      {props.contact && <p>Contact No: {props.contact}</p>}
    </div>
  );
}
