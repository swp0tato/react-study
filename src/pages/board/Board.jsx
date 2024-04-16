import React from 'react';
import './Board.style.css';
import Card from './Card';

const Board = () => {
  console.log('board page!');
  return (
    <div>
      <h3>맛집 추천 등록 페이지🧀</h3>
      <div className="add-btn">
        <button>등록하러 가기</button>{' '}
      </div>
      <Card />
    </div>
  );
};

export default Board;
