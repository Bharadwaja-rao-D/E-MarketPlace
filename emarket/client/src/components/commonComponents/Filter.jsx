import React from "react";
import "../../styles/filter.css";
import { useState } from "react";

export default function Filter() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleFilterClick = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setSelectedFilter(value);
    // setIsOpen(false);
  };

  return (
    <>
      <button className="filter-btn" onClick={handleFilterClick}>
        <i className="fa fa-filter"></i>
      </button>
      {isOpen && (
        <div className="filter-dropdown">
          <label>
            <input
              type="radio"
              name="filter"
              value="price"
              checked={selectedFilter === "price"}
              onChange={handleFilterChange}
            />
            Sort by price
          </label>
          <label>
            <input
              type="radio"
              name="filter"
              value="date"
              checked={selectedFilter === "date"}
              onChange={handleFilterChange}
            />
            Sort by date of purchase
          </label>
        </div>
      )}
    </>
  );
}
