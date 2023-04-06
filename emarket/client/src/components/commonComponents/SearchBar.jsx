import { useState } from "react";
import "../../styles/searchbar.css";
import useAxiosInstance from "../../utils/useAxios";

const SearchBar = ({ changeUrl }) => {
  const [searchText, setSearchText] = useState("");
  const [isOpen, setisOpen] = useState(false);
  // const related_items = ["laptop", "Lenovo Laptop", "Laptop Cover"];
  // const related_items = [""];
  const [related_items, setrelated_items] = useState([]);
  const api = useAxiosInstance();

  const handleInputChange = async (event) => {
    const new_text = event.target.value;
    setSearchText(new_text);
    // API cal to get related items
    //products/?search=text
    try {
      const url = "products/?search=" + new_text;
      const response = await api.get(url);
      // console.log(response.data);
      setrelated_items(response.data);
    } catch (e) {
      console.log(e);
    }
    if (new_text.length === 0) {
      setrelated_items([]);
    }
  };

  const handleSearch = async () => {
    //  Need an api call here
    //products/?prefix=text
    console.log(searchText);
    const url = "products/?prefix=" + searchText;
    changeUrl(url);
    setrelated_items([]);
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
            return <p key={index}>{item.name}</p>;
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
