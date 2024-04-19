import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase';
import './Reply.style.css';

const Reply = ({ boardId }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmitComment = async () => {
    try {
      if (!commentText) {
        alert('댓글을 입력해주세요.');
        return;
      }

      // 댓글 추가
      const commentData = {
        boardId: boardId,
        text: commentText,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'reply'), commentData);
      //   console.log('댓글이 성공적으로 추가되었습니다!');
      alert('댓글이 추가되었습니다!');

      // 입력 필드 초기화
      setCommentText('');
    } catch (error) {
      console.error('댓글을 추가하는 도중 오류가 발생했습니다:', error);
    }
  };

  return (
    <div className="comment-form">
      <textarea
        className="board-reply-input"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="댓글을 작성해보아요 : )"
      />
      <button className="reply-btn" onClick={handleSubmitComment}>
        댓글 작성
      </button>
    </div>
  );
};

export default Reply;
