import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import ReplyItem from './ReplyItem';

const ReplyList = ({ boardId }) => {
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

  return (
    <div className="reply-list">
      {comments.map((comment) => (
        <ReplyItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default ReplyList;
