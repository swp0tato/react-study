import React from 'react';
import './Board.style.css';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

const Board = () => {
  const navigate = useNavigate();

  const addBoard = () => {
    navigate('/board/write');
  };
  console.log('board page!');

  return (
    <div className="board-wrap">
      <h3 className="board-title">디저트 추천 🧀</h3>
      <div className="add-btn-wrap">
        <button onClick={addBoard} className="add-btn">
          등록하러 가기
        </button>{' '}
      </div>
      <Card />
    </div>
  );
};

export default Board;
