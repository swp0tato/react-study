import React from "react";
import Card from "./../../../../common/Card/Card";
import "./WeatherDessertSlide.style.css";
import { useCurrentWeatherQuery } from "../../../../hooks/useCurrentWeather";

const WeatherDessertSlide = ({ lat, lon }) => {
  const { data, isLoading, isError, error } = useCurrentWeatherQuery({
    lat,
    lon,
  });
  // console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    <div>Loading...</div>;
  }

  return (
    <div className="weather_dessert_section">
      <div className="weather_dessert_wrapper">
        <h2>지금 날씨엔 이 디저트 어떠세요? ({data.main})</h2>
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
