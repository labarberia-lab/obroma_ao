// ShareContentForm.js

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SHARE_POST_MUTATION } from '../graphql/mutations';

const ShareContentForm = () => {
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [sharePost] = useMutation(SHARE_POST_MUTATION, {
    // Add refetchQueries if necessary
  });

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await sharePost({ variables: { content, file } });
      setContent('');
      setFile(null);
      // Optionally, show success message or redirect to feed
    } catch (error) {
      // Handle error (e.g., display error message)
      console.error('Error sharing post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea 
        value={content} 
        onChange={handleContentChange} 
        placeholder="Write something..."
      />
      <input 
        type="file" 
        accept="image/*, video/*" 
        onChange={handleFileChange} 
      />
      <button type="submit">Share</button>
    </form>
  );
};

export default ShareContentForm;
