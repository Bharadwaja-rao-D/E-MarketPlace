import React from "react";
import { useState } from "react";
import "../../styles/pagenation.css";

export default function Pagenation({ changeUrl }) {
  const [count, setCount] = useState(1);
  const decreasePage = () => {
    if (count > 1) {
      const new_count = count - 1;
      setCount(new_count);
    }
  };
  const increasePage = () => {
    const new_count = count + 1;
    setCount(new_count);
  };

  return (
    <div className="pagenation">
      <i
        className="fa fa-angle-double-left pg-arrow"
        onClick={decreasePage}
      ></i>
      <div className="page-count">{count}</div>
      <i
        className="fa fa-angle-double-right pg-arrow"
        onClick={increasePage}
      ></i>
    </div>
  );
}
