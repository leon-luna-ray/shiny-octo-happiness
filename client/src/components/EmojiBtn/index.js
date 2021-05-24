import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/emojiPosts';
import './style.css';

const EmojiBtn = props => {
  const [emojiData, setEmojiData] = useState({
    name: '',
    emoji: '',
    type: '',
    createdAt: {
      type: Date,
      default: Date(),
    },
  });
  // react-redux dispatch will facilitate send/receive data from back end
  const dispatch = useDispatch();

  const handleClick = e => {
    e.preventDefault();
    setEmojiData({ ...emojiData, name: 'happy', emoji: '😀' });
    dispatch(createPost(emojiData));
  };
  return (
    <div className='emoji-div' onClick={handleClick}>
      <h1 id='emoji'>😀</h1>
      <p id='emoji-name'>Happy</p>
    </div>
  );
};

export default EmojiBtn;
