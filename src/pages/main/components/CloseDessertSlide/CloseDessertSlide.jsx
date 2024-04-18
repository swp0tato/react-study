import React, { useEffect, useState } from "react";
import Slider from "../../../../common/Slider/Slider";
import { responsive } from "./../../../../constans/responsive";
import "react-multi-carousel/lib/styles.css";
import "./CloseDessertSlide.style.css";
import { useSearchCloseDessertQuery } from "../../../../hooks/useSearchCloseDessert";
import { useSearchImageQuery } from "../../../../hooks/useSearchImage";

const CloseDessertSlide = ({ lat, lon }) => {
  const { data, isLoading, isError, error } = useSearchCloseDessertQuery({
    lat,
    lon,
  });

  // console.log("close-data", data);
  const [imageKeyword, setImageKeyword] = useState("");

  useEffect(() => {
    if (data && data.length > 0 && data[0].place_name) {
      setImageKeyword(data[0].place_name);
    }
  }, [data]);

  const { data: keywordImage } = useSearchImageQuery(imageKeyword);
  // console.log("imageKeyword?? ", imageKeyword);
  // console.log("keywordImage?? ", keywordImage);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="close_dessert_section">
      <div className="close_dessert_wrapper">
        <h2>가까운 디저트 맛집 Top5</h2>
        <Slider cafe={data} image={keywordImage} responsive={responsive} />
      </div>
    </div>
  );
};

export default CloseDessertSlide;
