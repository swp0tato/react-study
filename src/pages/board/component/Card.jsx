import React, { useState, useEffect } from 'react';
import './Card.style.css';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
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
            <FontAwesomeIcon icon={faUser} />
            <span>
              <h4 className="card-user-name">{post.user}</h4>
            </span>
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
