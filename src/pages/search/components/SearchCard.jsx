import React from "react";
import "./SearchCard.style.css";

const SearchCard = ({ cafe }) => {
  return (
    <div className="search_card_box">
      <h3 className="search_card_title">{cafe.place_name}</h3>
      <div className="search_card_phone">{cafe.phone}</div>
      <div className="search_card_address">
        <span>도로명</span>
        {cafe.road_address_name}
      </div>
      <div className="search_card_address">
        <span>지번</span>
        {cafe.address_name}
      </div>
      <div className="search_card_distance">
        {cafe.distance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} m
      </div>
    </div>
  );
};

export default SearchCard;
