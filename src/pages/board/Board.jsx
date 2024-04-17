import React, { useState, useEffect } from 'react';
import './Board.style.css';
import Card from './component/Card';
// import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Board = () => {
  const [posts, setPosts] = useState([]);

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

  return (
    <div>
      <h2>Board Test !</h2>
      {posts.map((post) => (
        <Card
          key={post.id}
          title={post.title}
          content={post.content}
          hashtags={post.hashtags}
          imgUrl={post.imageUrl}
          user={post.user}
        />
      ))}
    </div>
  );
};

export default Board;
