import React, { useState, useEffect } from 'react';
import './Card.style.css';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
const Card = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, 'items'));
      const fetchedPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      fetchedPosts.sort((a, b) => (a.date < b.date ? 1 : -1));

      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []);

  const goToDetail = (id) => {
    navigate(`detail/${id}`);
  };

  return (
    <div className="card-wrap">
      {posts.map((post) => (
        <div className="card-area">
          <img
            className="board-card"
            src={post.imageUrl}
            onClick={() => goToDetail(post.id)}
            alt=""
          />
          <div className="card-user-info">
            {post.profileImg ? (
              <img width={30} height={30} src={post.profileImg} alt="" />
            ) : (
              <img
                width={30}
                height={30}
                src="https://i.pinimg.com/736x/e9/ce/91/e9ce91bbb0d18e5555b1bbd3745a0fef.jpg"
                alt=""
              />
            )}
            <h4 className="card-user-name">{post.user}</h4>
          </div>
          <div className="hashtags">
            {post.hashtags.map((tag, index) => (
              <span className="hashtag" key={index}>
                #{tag}{' '}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
