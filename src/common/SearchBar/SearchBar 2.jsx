import React from "react";
import "./SearchBar.style.css";

const SearchBar = () => {
  return (
    <div className="search-group">
      <form>
        <div className="search-input-box">
          <input type="text" placeholder="검색어를 입력해 주세요." />
        </div>
        <button type="submit" className="btn-search">
          <img
            className="search-icon"
            src="/images/search.png"
            alt="search icon"
          />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
