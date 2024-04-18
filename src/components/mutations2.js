// mutations.js

import { gql } from '@apollo/client';

export const SEND_MESSAGE_MUTATION = gql`
  mutation SendMessage($senderId: ID!, $receiverId: ID!, $content: String!) {
    sendMessage(senderId: $senderId, receiverId: $receiverId, content: $content) {
      id
      sender {
        id
        username
      }
      receiver {
        id
        username
      }
      content
      createdAt
    }
  }
`;

// Define other mutations here
