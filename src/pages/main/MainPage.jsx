import React, { useEffect, useState } from "react";
import CloseDessertSlide from "./components/CloseDessertSlide/CloseDessertSlide";
import WeatherDessertSlide from "./components/WeatherDessertSlide/WeatherDessertSlide";

const MainPage = () => {
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
  });
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      // console.log("현재위치", lat, lon);
      setLocation({ lat, lon });
    });
  };
  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div>
      <CloseDessertSlide lat={location.lat} lon={location.lon} />
      <WeatherDessertSlide lat={location.lat} lon={location.lon} />
    </div>
  );
};

export default MainPage;
