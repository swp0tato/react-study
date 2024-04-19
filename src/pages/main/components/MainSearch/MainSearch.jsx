import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MainSearch.style.css";
import SearchBar from "../../../../common/SearchBar/SearchBar";

const MainSearch = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchBarProps = {
    width: "50%",
    height: "60px",
    keyword,
    onchange: (event) => setKeyword(event),
    onsubmit: (event) => {
      event.preventDefault();
      moveSearchMap(keyword);
    },
    onkeydown: (event) => {
      event.preventDefault();
      moveSearchMap(keyword);
    },
  };

  const moveSearchMap = (keyword) => {
    navigate(`/search?q=${keyword}`);
    setKeyword("");
  };

  return (
    <div className="main_search_section">
      <h1 className="main_search_title">지금 생각나는 디저트는?</h1>
      <SearchBar searchBarProps={searchBarProps} />
    </div>
  );
};

export default MainSearch;
