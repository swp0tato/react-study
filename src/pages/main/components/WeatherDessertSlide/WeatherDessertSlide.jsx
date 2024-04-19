import React, { useMemo } from "react";
import Slider from "../../../../common/Slider/Slider";
import { responsive } from "./../../../../constans/responsive";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-multi-carousel/lib/styles.css";
import "./../../../../common/Slider/Slider.style.css";
import "./WeatherDessertSlide.style.css";
import { useCurrentWeatherQuery } from "../../../../hooks/useCurrentWeather";
import { useSearchWeatherDessertQuery } from "../../../../hooks/useSearchWeatherDessert";
import { useSearchImageQueries } from "../../../../hooks/useSearchImage";

const WeatherDessertSlide = ({ lat, lon }) => {
  const { data, isLoading, isError, error } = useCurrentWeatherQuery({
    lat,
    lon,
  });

  let newDessert = [];
  let icon = "";
  let backgroundClass = "clear";

  if (data) {
    switch (Math.floor(data.id / 100)) {
      case 2:
        backgroundClass = "thunderstorm";
        newDessert = ["핫초코", "쿠키", "스콘", "뱅쇼"];
        icon = "&#127785;";
        break;
      case 3:
        backgroundClass = "drizzle";
        newDessert = ["라떼", "쿠키", "스콘", "브라우니"];
        icon = "&#128167;";
        break;
      case 5:
        backgroundClass = "rain";
        newDessert = ["라떼", "쿠키", "스콘", "브라우니"];
        icon = "&#127783;";
        break;
      case 6:
        backgroundClass = "snow";
        newDessert = ["핫초코", "쿠키", "스콘", "뱅쇼"];
        icon = "&#127784;";
        break;
      case 7:
        backgroundClass = "atmosphere";
        newDessert = ["타르트", "브라우니", "라떼", "주스"];
        icon = "&#128167;";
        break;
      case 8:
        if (data.id === 800) {
          backgroundClass = "clear";
          newDessert = [
            "케이크",
            "아이스크림",
            "빙수",
            "마카롱",
            "쿠키",
            "마들렌",
            "바닐라라떼",
            "아인슈페너",
            "샌드위치",
          ];
          icon = "&#127774;";
        } else {
          backgroundClass = "clouds";
          newDessert = ["브라우니", "아이스크림", "빙수", "크로플"];
          icon = "&#127780;";
        }
        break;
      default:
        backgroundClass = "clear";
    }
  }

  const { data: weatherDessert, refetch } = useSearchWeatherDessertQuery({
    lat,
    lon,
    newDessert,
  });
  // console.log("weatherDessert", weatherDessert);

  const { imageUrlData } = useSearchImageQueries(
    weatherDessert?.map((item) => item.place_name) || []
  );
  // console.log("imageUrlData-weather?? ", imageUrlData);

  const newData = useMemo(() => {
    if (!weatherDessert || !imageUrlData) return [];

    return weatherDessert.map((item, index) => ({
      place_name: item.place_name,
      address_name: item.address_name,
      imageUrl: imageUrlData[index] || null,
    }));
  }, [weatherDessert, imageUrlData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className={`weather_dessert_section ${backgroundClass}`}>
      <div className="weather_dessert_wrapper">
        <div className="weather_dessert_title">
          <h2>
            지금 날씨엔 이 디저트 어떠세요?&nbsp;
            <span dangerouslySetInnerHTML={{ __html: icon }}></span>
          </h2>
          <button onClick={refetch}>
            <FontAwesomeIcon icon={faRotateRight} />
          </button>
        </div>

        <Slider cafe={newData} responsive={responsive} />
      </div>
    </div>
  );
};

export default WeatherDessertSlide;
