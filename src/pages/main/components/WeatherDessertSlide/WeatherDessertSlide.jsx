import React from "react";
import "./WeatherDessertSlide.style.css";

const WeatherDessertSlide = () => {
  return (
    <div className="weather_dessert_section">
      <div className="weather_dessert_wrapper">
        <h2>오늘 같은 날씨엔 이 디저트 어떠세요?</h2>
        <div className="weather_slide_wrapper">
          <div className="slide">
            <div className="weather_img"></div>
            <div className="weather-detail">
              <div className="weather_name">스타벅스 남이섬점</div>
              <div className="weather_address">
                경기 가평군 가평읍 북한강변로 1054
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDessertSlide;
