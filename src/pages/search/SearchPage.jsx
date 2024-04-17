import React from "react";
import "./SearchPage.style.css";
import { useSearchMapQuery } from "../../hooks/useSearchMap";
import { useSelector } from "react-redux";

const SearchPage = () => {
  const { latitude, longitude } = useSelector(
    (state) => state.search?.location
  );
  const { data, isLoading, isError, error } = useSearchMapQuery();
  console.log("data!!", data);

  if (isLoading) {
    return <div className="search_map_spinner"></div>;
  }
  if (isError) {
    return (
      <div class="search_map_error_box">
        <div class="search_map_error_text">{error.message}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="search_map_wrapper">
        <section className="search_box">
          <div className="search_input_area">{/* <SearchBar/> */}</div>
          <div>
            <div className="search_result_title">
              <h3>경기도 양주시 주변</h3>
              <h1>'스타벅스' 검색 결과</h1>
            </div>
            <div className="search_filter_box">
              <button className="search_filter_button">거리 순</button>
              <button className="search_filter_button">이름 순</button>
            </div>
            <div>{/* <Card/> */}</div>
          </div>
        </section>
        <section className="search_map">map</section>
      </div>
    </div>
  );
};

export default SearchPage;
