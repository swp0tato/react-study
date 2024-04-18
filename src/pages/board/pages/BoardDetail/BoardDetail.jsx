import React, { useState, useEffect } from 'react';
import './BoardDetail.style.css';
import Comment from './componenet/Comment';
import { useParams } from 'react-router-dom';
import { db } from '../../../../firebase';
import { doc, getDoc } from 'firebase/firestore';

const BoardDetail = () => {
  let [comment, setComment] = useState('');
  let [isValid, setIsValid] = useState(false);
  // ! 민솔 추가한 부분 =============================
  const { id } = useParams();
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const fetchBoard = async () => {
      const docRef = doc(db, 'items', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBoard({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log('게시물이 존재하지 않습니다.');
      }
    };
    fetchBoard();
  }, [id]);

  if (!board) {
    return <div>Loading...</div>;
  }
  // ! ======================================================
  let post = (e) => {
    setComment('');
  };

  return (
    <div className="board-detail-wrap">
      <div className="board-post-area">
        // ! 확인용으로 3줄 잠시 넣었습니다 ! 확인하시구 지우시면 됩니닷
        //!이런식으로 요소들 원하시는 위치에서 가져다 쓰시면 돼요 !!
        <h1>{board?.title}</h1>
        <p>{board?.content}</p>
        <img width={100} height={100} src={board?.imageUrl} alt="" />
        <div className="board-img-box">
          <img
            src="https://a.cdn-hotels.com/gdcs/production49/d672/dfcca789-023a-490f-8f1a-46bc6a969000.jpg?impolicy=fcrop&w=800&h=533&q=medium"
            alt="리뷰 이미지"
          />
        </div>
        <div className="board-content-box">
          <p>게시물</p>
          <h3>카페125</h3>
          <p className="board-review-content">
            빵 종류가 다양하고 사장님이 친절해요!
          </p>
          <div className="position-box">
            <div className="board-date-box">작성일 2024-04-17</div>
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
            onChange={(e) => {
              setComment(e.target.value);
            }}
            onKeyUp={(e) => {
              e.target.value.length > 0 ? setIsValid(true) : setIsValid(false);
            }}
            value={comment}
          />
        </div>
        <div className="comment-btn-box">
          <button
            type="button"
            className={
              comment.length > 0 ? 'commentBtnActive' : 'commentBtnInactive'
            }
            onClick={post}
            disabled={isValid ? false : true}
          >
            등록
          </button>
        </div>
        <div>
          <Comment />
          <Comment />
          <Comment />
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
