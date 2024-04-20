import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "./BoardUpdate.style.css";

const BoardUpdate = () => {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [user, setUser] = useState("");
  const [date, setDate] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const defaultProfileImgUrl =
    "https://i.pinimg.com/736x/e9/ce/91/e9ce91bbb0d18e5555b1bbd3745a0fef.jpg";

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoard = async () => {
      const docRef = doc(db, "items", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const boardData = docSnap.data();
        setTitle(boardData.title);
        setContent(boardData.content);
        setHashtags(boardData.hashtags.join(", "));
        setUser(boardData.user);

        const timestamp = boardData.date;
        const dateObj = new Date(timestamp.seconds * 1000);
        const formattedDate = `${dateObj.getFullYear()}-${String(
          dateObj.getMonth() + 1
        ).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")}`;
        setDate(formattedDate);
        setProfileImg(boardData.profileImg || defaultProfileImgUrl);
        setBoard(boardData);
      } else {
        console.log('게시물이 존재하지 않습니다.');
      }
    };
    fetchBoard();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 게시물 업데이트
    const boardRef = doc(db, "items", id);
    await updateDoc(boardRef, {
      title,
      content,
      hashtags: hashtags.split(",").map((tag) => tag.trim()),
    });
    alert("게시물이 업데이트 되었습니다!");
    navigate(`/board/detail/${id}`);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="board-write-wrap">
      <div className="write-top-box">
        <img width={100} src="/images/cafe_icon.png" alt="카페 아이콘" />
        <p>나만 알기 아쉬운 카페를 추천해 주세요!</p>
      </div>
      <div className="write-form-wrap">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="hashtags">해시태그</label>
            <input
              type="text"
              id="hashtags"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
            />
          </div>
          <div>
            <div className="write-user-box">
              <img src={profileImg} alt="프로필 이미지" />
              <p>{user}</p>
            </div>
            <p className="write-date">작성일자 {date}</p>
          </div>
          <button type="submit" className="write-submit-btn">
            게시물 수정
          </button>
          <button
            type="button"
            className="write-cancel-btn"
            onClick={handleCancel}
          >
            취소
          </button>
        </form>
      </div>
    </div>
  );
};

export default BoardUpdate;
