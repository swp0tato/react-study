import React from "react";
import { useCurrentWeatherQuery } from "../../../../hooks/useCurrentWeather";
import Slider from "../../../../common/Slider/Slider";
import { responsive } from "./../../../../constans/responsive";
import "react-multi-carousel/lib/styles.css";
import "./WeatherDessertSlide.style.css";

const WeatherDessertSlide = ({ lat, lon }) => {
  const { data, isLoading, isError, error } = useCurrentWeatherQuery({
    lat,
    lon,
  });
  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    <div>Loading...</div>;
  }

  if (data) {
    //날씨에 따라 백그라운드 이미지 변경
    let backgroundClass = "clear"; //기본값

    switch (Math.floor(data.id / 100)) {
      case 2:
        backgroundClass = "thunderstorm";
        break;
      case 3:
        backgroundClass = "drizzle";
        break;
      case 5:
        backgroundClass = "rain";
        break;
      case 6:
        backgroundClass = "snow";
        break;
      case 7:
        backgroundClass = "atmosphere";
        break;
      case 8:
        if (data.weather[0].id === 800) {
          backgroundClass = "clear";
        } else {
          backgroundClass = "clouds";
        }
        break;
      default:
        backgroundClass = "clear"; // 기본값
    }

    return (
      <div className={`weather_dessert_section ${backgroundClass}`}>
        <div className="weather_dessert_wrapper">
          <h2>지금 날씨엔 이 디저트 어떠세요? ({data.main})</h2>
          <Slider responsive={responsive} />
        </div>
      </div>
    );
  }
};

export default WeatherDessertSlide;
