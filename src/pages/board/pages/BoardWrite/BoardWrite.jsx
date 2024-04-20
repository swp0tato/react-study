import React, { useState } from 'react';
import './BoardWrite.style.css';
import { storage, db } from '../../../../firebase';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const BoardWrite = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !title || !content || !image) {
      alert('사용자, 제목, 내용, 이미지를 모두 입력해주세요.');
      return;
    }

    try {
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);

      const imageUrl = await getDownloadURL(storageRef);

      const hashtagsArray = hashtags.split(',');

      await addDoc(collection(db, 'items'), {
        user,
        title,
        content,
        hashtags: hashtagsArray,
        date: Timestamp.fromDate(new Date()),
        imageUrl,
      });

      // 폼 초기화
      setUser('');
      setTitle('');
      setContent('');
      setHashtags('');
      setImage(null);
      alert('게시물이 성공적으로 추가되었습니다!');

      navigate('/board');
    } catch (error) {
      alert('게시물을 추가하는 중에 오류가 발생했습니다.');
    }
  };

  return (
    <div className="board-write-wrap">
      <div className="write-top-box">
        <img width={100} src="/images/cafe_icon.png" alt="카페 아이콘" />
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
          <input
            type="text"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
            placeholder="해시태그 (쉼표로 구분)"
          />
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
