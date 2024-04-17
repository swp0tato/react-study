import React, { useState } from 'react';
import './BoardWrite.style.css';
import { storage, db } from '../../../../firebase';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const BoardWrite = () => {
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
      // 이미지를 Firebase Storage에 업로드
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);

      // 이미지 URL을 가져옴
      const imageUrl = await getDownloadURL(storageRef);

      // 해시태그를 배열로 분할
      const hashtagsArray = hashtags.split(',');

      // Firestore에 게시물 추가
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
      alert('게시물이 성공적으로 추가되었습니다.');
    } catch (error) {
      console.error('게시물 추가 오류:', error);
      alert('게시물을 추가하는 중에 오류가 발생했습니다.');
    }
  };

  return (
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
        placeholder="내용"
        required
      />
      <input
        type="text"
        value={hashtags}
        onChange={(e) => setHashtags(e.target.value)}
        placeholder="해시태그 (쉼표로 구분)"
      />
      <input type="file" onChange={handleImageChange} required />
      <button type="submit">게시물 추가</button>
    </form>
  );
};
export default BoardWrite;
