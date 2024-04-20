import React from "react";
import { useNavigate } from "react-router-dom";
import "./Card.style.css";

const imgPath = process.env.REACT_APP_IMGPATH;

const Card = ({ cafe }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/search?q=${cafe.place_name}`);
  };

  const handleImageError = (event) => {
    event.target.src = `${imgPath}/no_image.png`;
  };

  return (
    <div className="card-item" onClick={handleCardClick}>
      <div className="card-image">
        <img
          src={cafe?.imageUrl ? cafe.imageUrl : `${imgPath}/no_image.png`}
          alt="카페 이미지"
          onError={handleImageError}
        />
      </div>
      <div className="card-detail">
        <h3 className="card-title">{cafe?.place_name}</h3>
        <h4 className="card-address">{cafe?.address_name}</h4>
      </div>
      <div className="card-like">
        <img src="/images/heart_empty.png" alt="좋아요 아이콘" />
      </div>
    </div>
  );
};

export default Card;
