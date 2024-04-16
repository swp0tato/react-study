import React from "react";
import CloseDessertSlide from "./components/CloseDessertSlide/CloseDessertSlide";
import WeatherDessertSlide from "./components/WeatherDessertSlide/WeatherDessertSlide";

const MainPage = () => {
  //현재 위치
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log("현재위치", lat, lon);
    });
  };

  getCurrentLocation();
  return (
    <div>
      <CloseDessertSlide />
      <WeatherDessertSlide />
    </div>
  );
};

export default MainPage;
