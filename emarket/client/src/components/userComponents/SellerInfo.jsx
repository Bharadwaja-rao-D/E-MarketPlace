import React from "react";
import "../../styles/sellerinfo.css";

export default function SellerInfo(props) {
  return (
    <div className="sellerinfo">
      <div className="underline"></div>

      <span className="heading">Seller Name :</span>
      <p>{props.username}</p>
      <span className="heading">Email ID : </span>
      <p>{props.email}</p>
      {props.contact && (
        <div>
          <span className="heading">Contact No: </span>
          <p>{props.contact}</p>{" "}
        </div>
      )}
    </div>
  );
}
