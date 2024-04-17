import React, { useState } from 'react';
import './BoardWrite.style.css';
// import { useNavigate } from 'react-router-dom';

const BoardWrite = () => {
  const [formData, setFormData] = useState({
    imageFile: null,
    user: '',
    title: '',
    content: '',
    hashtag: [],
    date: '',
  });

  const handleChange = (e) => {
    if (e.target.name === 'imageFile') {
      setFormData({ ...formData, imageFile: e.target.files[0] });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('image', formData.imageFile);
      formDataToSend.append('user', formData.user);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('date', formData.date);

      const response = await fetch('http://localhost:3003/products', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        console.log('New feed created successfully!');
        // 성공적으로 피드가 생성되었을 때 실행할 코드 작성
      } else {
        console.error('Failed to create new feed');
        // 피드 생성에 실패했을 때 실행할 코드 작성
      }
    } catch (error) {
      console.error('Error creating new feed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        name="imageFile"
        onChange={handleChange}
        accept="image/*"
      />
      <input
        type="text"
        name="user"
        value={formData.user}
        onChange={handleChange}
        placeholder="사용자명"
      />
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="제목"
      />
      <input
        type="text"
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="내용"
      />
      <input
        type="text"
        name="date"
        value={formData.date}
        onChange={handleChange}
        placeholder="날짜"
      />
      <button type="submit">피드 생성</button>
    </form>
  );
};
export default BoardWrite;
