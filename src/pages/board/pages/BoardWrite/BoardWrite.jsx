import React, { useState } from "react";
import "./BoardWrite.style.css";
import { storage, db } from "../../../../firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const BoardWrite = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const value = e.target.value.trim();
    if (value) {
      setTags([...tags, value]);
      e.target.value = "";
    }
  };

  const removeTag = (index) => {
    // 배열에서 선택된 해시태그 제거
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !title || !content || !image) {
      alert("사용자, 제목, 내용, 이미지를 모두 입력해주세요.");
      return;
    }

    try {
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);

      const imageUrl = await getDownloadURL(storageRef);

      await addDoc(collection(db, "items"), {
        user,
        title,
        content,
        hashtags: tags, // 수정된 부분: 해시태그 배열 전달
        date: Timestamp.fromDate(new Date()),
        imageUrl,
      });

      // 폼 초기화
      setUser("");
      setTitle("");
      setContent("");
      setTags([]); // 수정된 부분: 해시태그 초기화
      setImage(null);
      alert("게시물이 성공적으로 추가되었습니다!");

      navigate("/board");
    } catch (error) {
      alert("게시물을 추가하는 중에 오류가 발생했습니다.");
    }
  };

  return (
    <div className="board-write-wrap">
      <div className="write-top-box">
        <img width={100} src="/images/cookie_icon.png" alt="아이콘" />
        <p>나만 알기 아쉬운 카페를 추천해 주세요!</p>
      </div>
      <div className="write-form-wrap">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="사용자"
            required
          />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력해 주세요."
            required
          />

          <label htmlFor="hashtags" className="form-label">
            해시태그
          </label>
          <div className="tags-input-container">
            <input
              onKeyDown={handleKeyDown}
              type="text"
              className="tags-input"
              placeholder="입력 후 Enter키를 눌러주세요"
            />
            {tags.map((tag, index) => (
              <div className="tag-item" key={index}>
                <span className="text">{tag}</span>
                <span onClick={() => removeTag(index)} className="close">
                  &times;
                </span>
              </div>
            ))}
          </div>

          <input
            type="file"
            className="write-input-file"
            onChange={handleImageChange}
            required
          />
          <button type="submit" className="write-submit-btn">
            게시물 등록
          </button>
        </form>
      </div>
    </div>
  );
};
export default BoardWrite;
