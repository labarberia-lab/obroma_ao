// src/graphql/queries.js

import { gql } from '@apollo/client';

export const SEARCH_USERS_QUERY = gql`
  query SearchUsers($query: String!) {
    users(query: $query) {
      id
      name
      email
      // Add other user fields as needed
    }
  }
`;

export const SEARCH_CONTENT_QUERY = gql`
  query SearchContent($query: String!) {
    content(query: $query) {
      id
      title
      body
      // Add other content fields as needed
    }
  }
`;

// Add other query definitions here if needed
