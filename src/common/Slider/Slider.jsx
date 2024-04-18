import React from "react";
import Carousel from "react-multi-carousel";
import Card from "./../Card/Card";
import "./Slider.style.css";

const Slider = ({ cafe, image, responsive }) => {
  if (!cafe || cafe.length === 0) {
    return <div>No cafes available</div>;
  }

  return (
    <div>
      <Carousel
        swipeable={true}
        draggable={true}
        centerMode={true}
        responsive={responsive}
        containerClass="carousel-container"
        itemClass="carousel-item"
        removeArrowOnDeviceType={["mobile"]}
      >
        {cafe.map((cafe, index) => (
          <Card cafe={cafe} image={image} key={index} />
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
