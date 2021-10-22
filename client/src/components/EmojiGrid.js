import React from 'react';
import emojis from './emojis';
import EmojiBtn from './EmojiBtn';
import Mood from './Mood';
import { Container, Card, Col, Row } from 'react-bootstrap';

const EmojiGrid = ({ userEmoji, setUserEmoji }) => {
  const emojiBtns = emojis.map((emoji, index) => {
    return (
      <Col sm={6} md={4} lg={2}>
        <EmojiBtn key={index} emoji={emoji} setUserEmoji={setUserEmoji} />
      </Col>
    );
  });

  return (
    <Card>
      <Container>
        <Row>
          <Mood userEmoji={userEmoji} />
        </Row>
        <Row>{emojiBtns}</Row>
      </Container>
    </Card>
  );
};

export default EmojiGrid;
