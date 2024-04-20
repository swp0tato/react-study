import React, { useState, useEffect } from 'react';
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from '../../../firebase';
import './Reply.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Reply = ({ boardId }) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const q = query(
          collection(db, 'reply'),
          where('boardId', '==', boardId),
        );
        const querySnapshot = await getDocs(q);
        const commentsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(commentsData);
      } catch (error) {
        console.error('댓글을 불러오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchComments();
  }, [boardId]);

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

      const docRef = await addDoc(collection(db, 'reply'), commentData);
      const newComment = { id: docRef.id, ...commentData };

      // 상태 업데이트: 기존 댓글에 새로운 댓글 추가
      setComments((prevComments) => [...prevComments, newComment]);

      alert('댓글이 등록되었습니다!');

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
        등록
      </button>

      <div className="reply-list">
        <div className="comment-count">댓글 ({comments.length})</div>
        {comments.map((comment) => (
          <div key={comment.id} className="reply-item">
            <p>
              <FontAwesomeIcon icon={faUser} className="reply-user-icon" />{' '}
              {comment.text}
            </p>
            {/* 댓글 작성 시간이나 수정 삭제 넣을거면 버튼 주자 */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reply;
