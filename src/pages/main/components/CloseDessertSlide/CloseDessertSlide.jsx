import React, { useMemo } from "react";
import Slider from "../../../../common/Slider/Slider";
import { responsive } from "./../../../../constans/responsive";
import "react-multi-carousel/lib/styles.css";
import "./../../../../common/Slider/Slider.style.css";
import "./CloseDessertSlide.style.css";
import { useSearchCloseDessertQuery } from "../../../../hooks/useSearchCloseDessert";
import { useSearchImageQueries } from "../../../../hooks/useSearchImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const CloseDessertSlide = ({ lat, lon }) => {
  const { data, isLoading, isError, error } = useSearchCloseDessertQuery({
    lat,
    lon,
  });

  const { imageUrlData } = useSearchImageQueries(
    data?.map((item) => item.place_name) || []
  );
  // console.log("imageUrlData-close?? ", imageUrlData);

  const newData = useMemo(() => {
    return (
      data?.map((item, index) => ({
        place_name: item.place_name,
        address_name: item.address_name,
        imageUrl: imageUrlData[index] || null,
      })) || []
    );
  }, [data, imageUrlData]);

  const newDataSlice = newData.slice(0, 5);

  // console.log("New Data: ", newData);

  if (isLoading) {
    return (
      <div className="close_dessert_section">
        <div className="close_dessert_wrapper">
          <div className="loading-spinner">Loading...</div>
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="close_dessert_section">
        <div className="close_dessert_wrapper">
          <div className="error_message">
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="error_icon"
            />
            {error.message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="close_dessert_section">
      <div className="close_dessert_wrapper">
        <h2>가까운 디저트 맛집 &#127942; Top5</h2>
        <Slider cafe={newDataSlice} responsive={responsive} />
      </div>
    </div>
  );
};

export default CloseDessertSlide;
