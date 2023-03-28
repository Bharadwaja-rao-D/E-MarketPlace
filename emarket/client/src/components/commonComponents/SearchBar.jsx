import { useState } from "react";
import axios from "axios";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    axios
      .get(`https://example.com/search?query=${searchTerm}`)
      .then((response) => {
        // Handle successful response
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <button onClick={handleSearch}>
        <i class="fa fa-search" aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default SearchBar;
