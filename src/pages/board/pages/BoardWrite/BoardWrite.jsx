import React, { useState } from 'react';
import './BoardWrite.style.css';

const BoardWrite = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const restaurantData = {
      name: name,
      location: location,
      description: description,
      image: image,
    };

    localStorage.setItem('restaurantData', JSON.stringify(restaurantData));

    setName('');
    setLocation('');
    setDescription('');
    setImage(null);

    alert('맛집 정보가 저장되었습니다!');
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  return (
    <div className="board-write-wrap">
      <h3 className="board-write-title">디저트 추천서 쓰기🧀</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">카페 링크 추가</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">설명</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">사진</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">저장</button>
      </form>
    </div>
  );
};

export default BoardWrite;
