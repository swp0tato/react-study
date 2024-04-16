import React from "react";
import "./Card.style.css";

const Card = () => {
  return (
    <div className="card-item">
      <div className="card-image">
        <img src="https://via.placeholder.com/88" alt="카페 이미지" />
      </div>
      <div className="card-detail">
        <h3 className="card-title">러스트커피바</h3>
        <h4 className="card-address">경기 양주시 화합로 1758 러스트커피바</h4>
      </div>
      <div className="card-like">
        <img src="/images/heart_empty.png" alt="좋아요 아이콘" />
      </div>
    </div>
  );
};

export default Card;
