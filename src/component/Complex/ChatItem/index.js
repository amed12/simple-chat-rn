import React from 'react';
import IsMe from './IsMe';
import IsOther from './IsOther';

const ChatItem = ({isMe, text, time, photoUrl}) => {
  if (isMe) {
    return <IsMe text={text} time={time} />;
  }
  return <IsOther text={text} time={time} photoUrl={photoUrl} />;
};

export default ChatItem;
