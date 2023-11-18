import React from 'react';
import emojis from './emojis';
import EmojiBtn from './EmojiBtn';
import MoodBar from './MoodBar';
import { Col, Row } from 'react-bootstrap';

const EmojiGrid = ({ currentEmoji, setCurrentEmoji }) => {
  const renderEmojiBtns = emojis.map((emoji, index) => {
    return (
      <Col key={index} xs={4} md={3} lg={2}>
        <EmojiBtn key={index} emoji={emoji} setCurrentEmoji={setCurrentEmoji} />
      </Col>
    );
  });

  return (
    <div>
      <br />
      <Row>
        <MoodBar currentEmoji={currentEmoji} />
      </Row>
      <br />
      <Row>{renderEmojiBtns}</Row>
    </div>
  );
};

export default EmojiGrid;
