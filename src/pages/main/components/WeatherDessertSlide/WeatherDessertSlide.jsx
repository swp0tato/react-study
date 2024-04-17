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
    return <div>{error.message}</div>;
  }

  // 날씨 데이터가 존재하지 않을 경우 빈 화면을 반환
  if (!data) {
    return null;
  }

  //날씨에 따라 백그라운드 이미지 변경
  let backgroundClass = "clear"; //기본값
  let newDessert = [];

  switch (Math.floor(data.id / 100)) {
    case 2:
      backgroundClass = "thunderstorm";
      newDessert = ["핫초코", "쿠키", "스콘", "뱅쇼"];
      break;
    case 3:
      backgroundClass = "drizzle";
      newDessert = ["라떼", "쿠키", "스콘", "브라우니"];
      break;
    case 5:
      backgroundClass = "rain";
      newDessert = ["라떼", "쿠키", "스콘", "브라우니"];
      break;
    case 6:
      backgroundClass = "snow";
      newDessert = ["핫초코", "쿠키", "스콘", "뱅쇼"];
      break;
    case 7:
      backgroundClass = "atmosphere";
      newDessert = ["타르트", "브라우니", "라떼", "주스"];
      break;
    case 8:
      if (data.id === 800) {
        backgroundClass = "clear";
        newDessert = ["케이크", "아이스크림", "빙수", "마카롱"];
      } else {
        backgroundClass = "clouds";
        newDessert = ["브라우니", "아이스크림", "빙수", "크로플"];
      }
      break;
    default:
      backgroundClass = "clear"; // 기본값
  }

  return (
    <div className={`weather_dessert_section ${backgroundClass}`}>
      <div className="weather_dessert_wrapper">
        <div className="weather_dessert_title">
          <h2>지금 날씨엔 이 디저트 어떠세요? ({data.main})</h2>
          <p>
            {newDessert.map((dessert, index) => (
              <span key={index}>#{dessert} </span>
            ))}
          </p>
        </div>

        <Slider responsive={responsive} />
      </div>
    </div>
  );
};

export default WeatherDessertSlide;
