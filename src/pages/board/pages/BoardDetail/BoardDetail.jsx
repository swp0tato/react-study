import React, { useState, useEffect } from 'react';
import './BoardDetail.style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { db, storage } from '../../../../firebase';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import Reply from '../../component/Reply';
import ReplyList from '../../component/ReplyList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
const BoardDetail = () => {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchBoard = async () => {
      const docRef = doc(db, 'items', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const boardData = docSnap.data();
        const timestamp = boardData.date;
        const date = new Date(timestamp.seconds * 1000);
        const formattedDate = `${date.getFullYear()}-${String(
          date.getMonth() + 1,
        ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        setBoard({ ...boardData, date: formattedDate });
      } else {
        console.log('피드가 존재하지 않습니다.');
      }
    };
    fetchBoard();
  }, [id]);

  const handleDelete = async () => {
    try {
      // 이미지 삭제
      if (board.imageUrl) {
        const imageRef = ref(storage, board.imageUrl);
        await deleteObject(imageRef);
      }

      await deleteDoc(doc(db, 'items', id));
      alert('피드가 삭제되었습니다!');
      navigate('/board');
    } catch (error) {
      console.error('피드 삭제 중 오류가 발생했습니다:', error);
    }
  };

  if (!board) {
    return <div>Loading...</div>;
  }

  const confirmDelete = () => {
    const result = window.confirm('정말 삭제하시겠습니까?');
    if (result) {
      handleDelete();
    }
  };

  const goToUpdatePage = () => {
    navigate(`/board/edit/${id}`);
  };

  return (
    <div className="board-detail-wrap">
      <div className="board-post-area">
        <div className="board-img-box">
          <img src={board?.imageUrl} alt="리뷰 이미지" />
        </div>
        <div className="board-content-box">
          <p>Board</p>
          <div className="detail-user-box">
            {board.profileImg ? (
              <img src={board.profileImg} alt="사용자 이미지" />
            ) : (
              <img
                src="https://i.pinimg.com/736x/e9/ce/91/e9ce91bbb0d18e5555b1bbd3745a0fef.jpg"
                alt="사용자 이미지"
              />
            )}
            <p>{board?.user}</p>
          </div>
          <h3>
            <span className="cafe-title">카페명</span>{' '}
            <span className="cafe-title-text">{board?.title}</span>
          </h3>
          <p className="board-review-content">{board?.content}</p>

          <div className="board-detail-hashtags">
            {board?.hashtags.map((tag, index) => (
              <span key={index}># {tag}</span>
            ))}
          </div>

          <div className="position-box">
            <div className="board-date-box">{board?.date}</div>
            <div className="modify-btn-box">
              <button onClick={goToUpdatePage}>수정</button>
              <button className="delete-btn" onClick={confirmDelete}>
                삭제
              </button>
            </div>
          </div>
        </div>
      </div>
      <Reply boardId={id} />
      <ReplyList comments={comments} />
      <div className="board-reply-wrap">
        댓글 ({board?.reply?.length || 0})
        {board?.reply?.map((re, index) => (
          <span key={index} className="board-reply-content">
            <FontAwesomeIcon icon={faUser} color="#ede9e1" /> {re}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BoardDetail;
