// mutations.js

import { gql } from '@apollo/client';

export const FOLLOW_USER_MUTATION = gql`
  mutation FollowUser($userId: ID!) {
    followUser(userId: $userId) {
      id
      username
      followers {
        id
        username
      }
      following {
        id
        username
      }
    }
  }
`;

// Define other mutations here
