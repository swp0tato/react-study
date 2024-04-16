import React from "react";
import Card from "./../../../../common/Card/Card";
import "./CloseDessertSlide.style.css";

const CloseDessertSlide = () => {
  return (
    <div className="close_dessert_section">
      <div className="close_dessert_wrapper">
        <h2>가까운 디저트 맛집 Top5</h2>
        <div className="slider">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>

      {/* <div className="close_dessert_wrapper">
        <div className="slide">
          <div className="close_img"></div>
          <div className="close_name">스타벅스 남이섬점</div>
          <div className="close_address">
            경기 가평군 가평읍 북한강변로 1054
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default CloseDessertSlide;
