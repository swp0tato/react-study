import React from "react";
import Slider from "../../../../common/Slider/Slider";
import { responsive } from "./../../../../constans/responsive";
import "react-multi-carousel/lib/styles.css";
import "./CloseDessertSlide.style.css";
import { useSearchCloseDessertQuery } from "../../../../hooks/useSearchCloseDessert";

const CloseDessertSlide = ({ lat, lon }) => {
  const { data, isLoading, isError, error } = useSearchCloseDessertQuery({
    lat,
    lon,
  });
  console.log("close-data", data);

  return (
    <div className="close_dessert_section">
      <div className="close_dessert_wrapper">
        <h2>가까운 디저트 맛집 Top5</h2>
        <Slider cafe={data} responsive={responsive} />
      </div>
    </div>
  );
};

export default CloseDessertSlide;
