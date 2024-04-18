import React from "react";
import "./Comment.style.css";

const Comment = ({ cmt }) => {
  return (
    <div className="comment">
      <div className="comment-user-img-box">
        <img
          src="https://icones.pro/wp-content/uploads/2021/02/icone-utilisateur-gris.png"
          alt="사용자 이미지"
        />
      </div>
      <div className="comment-content">
        <h4>user</h4>
        <p>{cmt}</p>
      </div>
    </div>
  );
};

export default Comment;
