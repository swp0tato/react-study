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
    <div className="card">
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.user}</h3>
            <h2>{post.title}</h2>
            <img
              width={250}
              height={250}
              src={post.imageUrl}
              onClick={() => goToDetail(post.id)}
              alt=""
            />
            <ul className="hashtags">
              {post.hashtags.map((tag, index) => (
                <li key={index}>#{tag} </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Card;
