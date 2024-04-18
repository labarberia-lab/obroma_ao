// MessageForm.js

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SEND_MESSAGE_MUTATION } from '../graphql/mutations';

const MessageForm = ({ senderId, receiverId }) => {
  const [content, setContent] = useState('');
  const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION, {
    variables: { senderId, receiverId, content },
    // Add refetchQueries if necessary
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button type="submit">Send Message</button>
    </form>
  );
};

export default MessageForm;
