import React from "react";
import "./SearchBar.style.css";

const SearchBar = ({ children, ...rest }) => {
  const { width } = rest.searchBarProps;
  const keyDownEvent = (event) => {
    if (event.key === "Enter" && event.nativeEvent.isComposing === false)
      rest.searchBarProps.onkeydown(event);
  };
  return (
    <div
      className="search-group"
      style={{ width: width, height: rest.searchBarProps.height }}
    >
      <form onSubmit={rest.searchBarProps.onsubmit}>
        <div className="search-input-box">
          <input
            type="text"
            placeholder="검색어를 입력해 주세요."
            onChange={(event) =>
              rest.searchBarProps.onchange(event.target.value)
            }
            onKeyDown={keyDownEvent}
            value={rest.searchBarProps.keyword}
          />
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
