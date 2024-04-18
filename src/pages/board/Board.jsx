import React from 'react';
import './Board.style.css';
import Card from './component/Card';
import { useNavigate } from 'react-router-dom';

const Board = () => {
  const navigate = useNavigate();

  const goToWrite = () => {
    navigate('write');
  };
  return (
    <div>
      <h2>Board Test !</h2>
      <button onClick={goToWrite}>피드 작성 버튼</button>
      <Card />
    </div>
  );
};

export default Board;
