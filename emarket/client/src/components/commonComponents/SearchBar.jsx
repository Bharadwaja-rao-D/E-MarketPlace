import { useState } from "react";
import axios from "axios";
import "../../styles/searchbar.css";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
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

  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <button onClick={handleSearch} className="search-icon">
        <i class="fa fa-search" aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default SearchBar;
