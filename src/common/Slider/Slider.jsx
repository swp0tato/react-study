import React from "react";
import Carousel from "react-multi-carousel";
import Card from "./../Card/Card";
import "./Slider.style.css";

const Slider = ({ responsive }) => {
  return (
    <div>
      <Carousel
        swipeable={true}
        draggable={true}
        centerMode={true}
        infinite={true}
        responsive={responsive}
        containerClass="carousel-container"
        itemClass="carousel-item"
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </Carousel>
    </div>
  );
};

export default Slider;
