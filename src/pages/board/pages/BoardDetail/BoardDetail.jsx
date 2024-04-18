import React, { useState } from "react";
import "./BoardDetail.style.css";
import Comment from "./componenet/Comment";

const BoardDetail = () => {
  let [comment, setComment] = useState("");
  let [isValid, setIsValid] = useState(false);

  let post = (e) => {
    setComment("");
  };

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
          <p className="board-review-content">
            빵 종류가 다양하고 사장님이 친절해요!
          </p>
          <div className="position-box">
            <div className="board-date-box">작성일 2024-04-17</div>
            <div className="modify-btn-box">
              <button>수정</button>
              <button className="delete-btn">삭제</button>
            </div>
          </div>
        </div>
      </div>
      <div className="board-comment-area">
        <p>댓글</p>
        <div className="comment-textarea-box">
          <div className="comment-user-img-box">
            <img
              src="https://icones.pro/wp-content/uploads/2021/02/icone-utilisateur-gris.png"
              alt="사용자 이미지"
            />
          </div>
          <textarea
            type="text"
            className="comment-textarea"
            placeholder="내용을 입력해 주세요."
            onChange={(e) => {
              setComment(e.target.value);
            }}
            onKeyUp={(e) => {
              e.target.value.length > 0 ? setIsValid(true) : setIsValid(false);
            }}
            value={comment}
          />
        </div>
        <div className="comment-btn-box">
          <button
            type="button"
            className={
              comment.length > 0 ? "commentBtnActive" : "commentBtnInactive"
            }
            onClick={post}
            disabled={isValid ? false : true}
          >
            등록
          </button>
        </div>
        <div>
          <Comment />
          <Comment />
          <Comment />
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
