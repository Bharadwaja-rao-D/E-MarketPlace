import React from "react";
import { useParams } from "react-router-dom";

function Edit() {
  const { id } = useParams();
  return (
    <div>
      <h3>Make a form to edit product ID={id}</h3>
    </div>
  );
}

export default Edit;
