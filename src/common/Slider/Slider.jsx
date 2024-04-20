import React from "react";
import Carousel from "react-multi-carousel";
import Card from "./../Card/Card";
import "./Slider.style.css";

const Slider = ({ cafe, responsive }) => {
  if (!cafe || cafe.length === 0) {
    return <div>No cafes available</div>;
  }

  return (
    <div>
      <Carousel
        swipeable={true}
        draggable={true}
        partialVisible={true}
        responsive={responsive}
        containerClass="carousel-container"
        itemClass="carousel-item"
        removeArrowOnDeviceType={["mobile"]}
      >
        {cafe.map((cafe, index) => (
          <Card cafe={cafe} key={index} />
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
