import React from 'react';
import './Card.style.css';
import { useNavigate } from 'react-router-dom';

const Card = () => {
  const navigate = useNavigate();
  const goToDetail = () => {
    navigate('detail');
  };
  return (
    <div className="board-card-wrap">
      <img
        onClick={goToDetail}
        className="board-card"
        src="https://i.pinimg.com/564x/38/05/43/380543773cf92b31b5dcfd5e715e9350.jpg"
        alt=""
      />{' '}
      <img
        className="board-card"
        src="https://i.pinimg.com/564x/cf/03/a8/cf03a88c25c814493285cd6a99756c8e.jpg"
        alt=""
      />{' '}
      <img
        className="board-card"
        src="https://i.pinimg.com/564x/07/0b/92/070b92d67724ca725887735744e51eaf.jpg"
        alt=""
      />{' '}
      <img
        className="board-card"
        src="https://i.pinimg.com/564x/89/a4/8a/89a48a8abc17156702fac6706bdc519a.jpg"
        alt=""
      />{' '}
      <img
        className="board-card"
        src="https://i.pinimg.com/564x/3d/30/c1/3d30c1082ef497def06fcdefda2b02e6.jpg"
        alt=""
      />{' '}
      <img
        className="board-card"
        src="https://cdn.mhns.co.kr/news/photo/201909/295747_401321_3135.jpg"
        alt=""
      />{' '}
      <img
        className="board-card"
        src="https://i.pinimg.com/564x/33/b5/57/33b55707be6bf9a05b7f0b714b45fde1.jpg"
        alt=""
      />{' '}
      <img
        className="board-card"
        src="https://i.pinimg.com/564x/43/c6/94/43c6949dd9c279bc11dab53956fbf422.jpg"
        alt=""
      />{' '}
    </div>
  );
};

export default Card;
