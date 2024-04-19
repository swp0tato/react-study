import React, { useEffect, useState } from "react";
import CloseDessertSlide from "./components/CloseDessertSlide/CloseDessertSlide";
import WeatherDessertSlide from "./components/WeatherDessertSlide/WeatherDessertSlide";

const MainPage = () => {
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
  });

  useEffect(() => {
    const getCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLocation({ lat, lon });
      });
    };

    getCurrentLocation();
  }, []);

  return (
    <div>
      {location.lat !== null && location.lon !== null && (
        <CloseDessertSlide lat={location.lat} lon={location.lon} />
      )}
      {location.lat !== null && location.lon !== null && (
        <WeatherDessertSlide lat={location.lat} lon={location.lon} />
      )}
    </div>
  );
};

export default MainPage;
