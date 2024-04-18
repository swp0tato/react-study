import React, { useState, useEffect } from 'react';
import './BoardDetail.style.css';
import Comment from './componenet/Comment';
import { useParams } from 'react-router-dom';
import { db } from '../../../../firebase';
import { doc, getDoc } from 'firebase/firestore';

const BoardDetail = () => {
  let [isValid, setIsValid] = useState(false);

  const savedCmts = JSON.parse(localStorage.getItem('cmts')) || [];
  const [cmts, setCmts] = useState(savedCmts);
  const [newCmt, setNewCmt] = useState('');

  useEffect(() => {
    localStorage.setItem('cmts', JSON.stringify(cmts));
  }, [cmts]);

  const addCmt = () => {
    setCmts([...cmts, newCmt]);
    setNewCmt('');
    localStorage.setItem('cmts', JSON.stringify([...cmts, newCmt]));
  };

  const { id } = useParams();
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const fetchBoard = async () => {
      const docRef = doc(db, 'items', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const boardData = docSnap.data();
        // Convert timestamp to Date object
        const timestamp = boardData.date;
        const date = new Date(timestamp.seconds * 1000);
        // Format date as desired (e.g., YYYY-MM-DD)
        const formattedDate = `${date.getFullYear()}-${String(
          date.getMonth() + 1,
        ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        setBoard({ ...boardData, date: formattedDate });
      } else {
        console.log('게시물이 존재하지 않습니다.');
      }
    };
    fetchBoard();
  }, [id]);

  if (!board) {
    return <div>Loading...</div>;
  }

  return (
    <div className="board-detail-wrap">
      <div className="board-post-area">
        <div className="board-img-box">
          <img src={board?.imageUrl} alt="리뷰 이미지" />
        </div>
        <div className="board-content-box">
          <p>게시물</p>
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
            <span className="cafe-title">카페명</span> {board?.title}
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
            value={newCmt}
            onChange={(e) => {
              setNewCmt(e.target.value);
            }}
            onKeyUp={(e) => {
              e.target.value.length > 0 ? setIsValid(true) : setIsValid(false);
            }}
          />
        </div>
        <div className="comment-btn-box">
          <button
            type="button"
            className={
              newCmt.length > 0 ? 'commentBtnActive' : 'commentBtnInactive'
            }
            onClick={addCmt}
            disabled={isValid ? false : true}
          >
            등록
          </button>
        </div>
        <div>
          {cmts.map((cmt, index) => (
            <Comment key={index} cmt={cmt} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
