import React, { useState, useEffect } from 'react';
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
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

      // 상태 업데이트: 최신순이 위로 올라오게 설정
      setComments((prevComments) => [newComment, ...prevComments]);

      alert('댓글이 등록되었습니다!');

      setCommentText('');
    } catch (error) {
      console.error('댓글을 추가하는 도중 오류가 발생했습니다:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    console.log('Deleting comment with ID:', commentId);
    try {
      await deleteDoc(doc(db, 'reply', commentId));

      // 댓글 삭제 후 상태 업데이트
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId),
      );

      alert('댓글이 삭제되었습니다!');
    } catch (error) {
      console.error('댓글을 삭제하는 도중 오류가 발생했습니다:', error);
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
              <button
                className="reply-delete-btn"
                onClick={() => handleDeleteComment(comment.id)}
              >
                삭제
              </button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reply;
