import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPosts, createPost } from '../lib/api'
import { useAuth } from '../contexts/AuthContext'

// Temp use local storage
// import { fetchPosts, createPost } from '../lib/localStorage'

import { Container, Row, Col } from 'react-bootstrap';
import EmojiGrid from '../components/EmojiGrid';
import UserPosts from '../components/UserPosts';
import DarkModeBtn from '../components/DarkModeBtn';
import '../styles/index.css';

const Dasboard = () => {
  const navigate = useNavigate();

  // State
  const { user, isLoggedIn } = useAuth();
  const [posts, setPosts] = useState([]);
  const [currentEmoji, setCurrentEmoji] = useState(null);

  // Methods
  const fetchUserPosts = async () => {
    try {
      const result = await fetchPosts(user.id, token);
      setPosts(result?.data.reverse());
    } catch (error) {
      console.error('Error fetching posts:', error.message);
    }
  };

  const savePost = async () => {
    try {
      const newPost = {
        userId: user.id,
        createdAt: new Date(),
        name: currentEmoji.name,
        secondary: currentEmoji.secondary,
        type: currentEmoji.type,
        level: currentEmoji.level,
        emoji: currentEmoji.emoji,
      };
      await createPost(newPost, token);
      await fetchUserPosts();
    } catch (error) {
      console.error('Error saving post:', error.message);
    }
  };

  const formatDateAndTime = (createdAt) => {
    if (!createdAt) {
      return { date: '', time: '' };
    }
    const date = new Date(createdAt);
    const postDate = date.toLocaleDateString('en-US', {
      dateStyle: 'medium',
    });
    const postTime = date.toLocaleTimeString('en-US', {
      timeStyle: 'short',
    });

    return {
      date: postDate,
      time: postTime,
    };
  };

  // Lifecycle
  useEffect(() => {
    if (!isLoggedIn || !user) {
      navigate('/login');
    } else if (currentEmoji) {
      savePost();
    } else {
      fetchUserPosts();
    }
  }, [currentEmoji, user, isLoggedIn, navigate]);

  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <Container>
      <Row>
        <Col className='d-flex justify-content-end'>
          <DarkModeBtn />
        </Col>
      </Row>
      <Row>
        {
          posts ? <EmojiGrid
            currentEmoji={currentEmoji}
            setCurrentEmoji={setCurrentEmoji}
          /> : ''
        }
      </Row>
      <br />
      <br />
      <Row>
        <UserPosts posts={posts} formatDateAndTime={formatDateAndTime} />
      </Row>
    </Container>
  );
};

export default Dasboard;
