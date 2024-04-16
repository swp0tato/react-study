import React from "react";
import Card from "./../../../../common/Card/Card";
import "./WeatherDessertSlide.style.css";

const WeatherDessertSlide = () => {
  return (
    <div className="weather_dessert_section">
      <div className="weather_dessert_wrapper">
        <h2>오늘 같은 날씨엔 이 디저트 어떠세요?</h2>
        <div className="slider">
          <Card />
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

export default WeatherDessertSlide;
