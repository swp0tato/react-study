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
    </div>
  );
};

export default CloseDessertSlide;
