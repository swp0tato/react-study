import React from 'react';

const ReplyItem = ({ comment }) => {
  return (
    <div className="reply-item">
      <p>{comment.text}</p>
      <p>{comment.createdAt.toDate().toString()}</p>
      {/* 댓글 작성자 등 추가 정보 표시 가능 */}
    </div>
  );
};

export default ReplyItem;
