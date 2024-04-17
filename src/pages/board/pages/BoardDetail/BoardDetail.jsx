import React from "react";
import "./BoardDetail.style.css";

const BoardDetail = () => {
  return (
    <div className="board-detail-wrap">
      <div className="board-post-area">
        <div className="board-img-box">
          <img
            src="https://a.cdn-hotels.com/gdcs/production49/d672/dfcca789-023a-490f-8f1a-46bc6a969000.jpg?impolicy=fcrop&w=800&h=533&q=medium"
            alt="리뷰 이미지"
          />
        </div>
        <div className="board-content-box">
          <p>게시물</p>
          <h3>카페125</h3>
          <p>빵 종류가 다양하고 사장님이 친절해요!</p>
        </div>
      </div>
      <div className="board-comment-area">
        <p>댓글</p>
      </div>
    </div>
  );
};

export default BoardDetail;
