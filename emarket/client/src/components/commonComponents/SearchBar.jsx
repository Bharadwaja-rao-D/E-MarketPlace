import { useState } from "react";
import axios from "axios";
import "../../styles/searchbar.css";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [isOpen, setisOpen] = useState(false);
  // const related_items = ["laptop", "Lenovo Laptop", "Laptop Cover"];
  const related_items = [""];

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
    // API cal to get related items
  };

  const handleSearch = () => {
    //  Need an api call here
    console.log(searchText);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const handleChoice = (event) => {
    console.log(event.target.value);
  };
  return (
    <div className="searchbar">
      <div className="search">
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <i
          className="fa fa-search search-icon"
          aria-hidden="true"
          onClick={handleSearch}
        ></i>
        <div className="results">
          {related_items.map((item, index) => {
            return <p key={index}>{item}</p>;
          })}
        </div>
      </div>
      <div className="filter">
        <div className="filter-icon" onClick={() => setisOpen(!isOpen)}>
          <i className="fa fa-filter fa-2x"></i>
          <i className="fa fa-angle-down"></i>
        </div>
        {isOpen && (
          <div className="filter-options">
            <label>
              <input
                type="radio"
                name="option"
                value="cost"
                onChange={handleChoice}
              />
              Cost
            </label>
            <label>
              <input
                type="radio"
                name="option"
                value="date"
                onChange={handleChoice}
              />
              Date of Purchase
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
