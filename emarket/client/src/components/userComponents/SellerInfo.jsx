import React from "react";

export default function SellerInfo(props) {
  return (
    <div className="sellerinfo">
      <h2>Seller Name:{props.username}</h2>
      <h3>Email ID: {props.email}</h3>
      {props.contact && <h3>Contact No: {props.contact}</h3>}
    </div>
  );
}
