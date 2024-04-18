import React from 'react';
import './Card.style.css';
// import { useNavigate } from 'react-router-dom';

const Card = ({ title, content, hashtags, imgUrl, user }) => {
  // const navigate = useNavigate();
  // const goToDetail = () => {
  //   navigate('detail');
  // };
  return (
    <div className="card">
      <img width={250} height={250} src={imgUrl} alt="" />
      <h4>{user}</h4>
      <p>{content}</p>
      <div className="hashtags">
        {hashtags.map((tag, index) => (
          <span key={index}>#{tag} </span>
        ))}
      </div>
    </div>
  );
};

export default Card;
