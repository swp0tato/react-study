import React from 'react';

const ReplyList = ({ comments }) => {
  return (
    <div className="comments-list">
      <ul>
        {comments.map((comment) => (
          <li key={comment.boardId}>
            <p>{comment.text}</p>
            <p>작성 시간: {comment.createdAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReplyList;
