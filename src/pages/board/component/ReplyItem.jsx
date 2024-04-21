import React from 'react';

const ReplyItem = ({ comment }) => {
  return (
    <div className="reply-item">
      <p>{comment.text}</p>
      <p>{comment.createdAt.toDate().toString()}</p>
    </div>
  );
};

export default ReplyItem;
