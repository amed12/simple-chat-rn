import React from 'react';
import IsMe from './IsMe';
import IsOther from './IsOther';

const ChatItem = ({isMe}) => {
  if (isMe) {
    return <IsMe />;
  }
  return <IsOther />;
};

export default ChatItem;
