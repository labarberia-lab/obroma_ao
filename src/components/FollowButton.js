// FollowButton.js

import React from 'react';
import { useMutation } from '@apollo/client';
import { FOLLOW_USER_MUTATION } from '../graphql/mutations';

const FollowButton = ({ userId }) => {
  const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
    variables: { userId },
    // Add refetchQueries if necessary
  });

  const handleFollow = () => {
    followUser();
  };

  return (
    <button onClick={handleFollow}>Follow</button>
  );
};

export default FollowButton;
