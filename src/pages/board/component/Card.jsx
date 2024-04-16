import React from 'react';
import './Card.style.css';
import { useNavigate } from 'react-router-dom';

const Card = ({ item }) => {
  const navigate = useNavigate();
  const goToDetail = () => {
    navigate('detail');
  };
  return (
    <div className="card-wrap">
      <img className="board-card" onClick={goToDetail} src={item?.img} alt="" />
      <div>{item?.user}</div>
      <div>{item?.hashtag}</div>
    </div>
  );
};

export default Card;
