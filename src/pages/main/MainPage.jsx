import React, { useEffect, useState } from "react";
import CloseDessertSlide from "./components/CloseDessertSlide/CloseDessertSlide";
import WeatherDessertSlide from "./components/WeatherDessertSlide/WeatherDessertSlide";
import DessertHashtags from "./components/DessertHashtags/DessertHashtags";
import MainSearch from "./components/MainSearch/MainSearch";
import "./MainPage.style.css";

const MainPage = () => {
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLocation({ lat, lon });
          setLoading(false);
        },
        (error) => {
          console.error(error);
          setLoading(false);
        }
      );
    };

    getCurrentLocation();
  }, []);

  return (
    <div>
      <MainSearch />
      {!loading && (
        <>
          <CloseDessertSlide lat={location.lat} lon={location.lon} />
          <DessertHashtags />
          <WeatherDessertSlide lat={location.lat} lon={location.lon} />
        </>
      )}
      {loading && <div className="loading-spinner">Loading...</div>}
    </div>
  );
};

export default MainPage;
