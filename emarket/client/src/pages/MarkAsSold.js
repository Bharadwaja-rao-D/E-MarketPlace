import React from "react";
import { useParams } from "react-router-dom";

function MarkAsSold() {
  const { id } = useParams();
  return (
    <div>
      <h3>Make a form to Mark a product as Sold ID={id}</h3>
    </div>
  );
}

export default MarkAsSold;
