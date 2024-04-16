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

  if (data) {
    //날씨에 따라 백그라운드 이미지 변경
    let backgroundClass = "clear"; //기본값

    switch (data.main) {
      case "Thunderstorm":
        backgroundClass = "thunderstorm";
        break;
      case "Drizzle":
        backgroundClass = "drizzle";
        break;
      case "Rain":
        backgroundClass = "rain";
        break;
      case "Snow":
        backgroundClass = "snow";
        break;
      case "Atmosphere":
        backgroundClass = "atmosphere";
        break;
      case "Clear":
        backgroundClass = "clear";
        break;
      case "Clouds":
        backgroundClass = "clouds";
        break;
      default:
        backgroundClass = "clear"; // 기본값
    }
    return (
      <div className={`weather_dessert_section ${backgroundClass}`}>
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
  }
};

export default WeatherDessertSlide;
