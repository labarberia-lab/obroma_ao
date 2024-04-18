// mutations.js

import { gql } from '@apollo/client';

export const UPDATE_PRIVACY_SETTINGS_MUTATION = gql`
  mutation UpdatePrivacySettings($settings: PrivacySettingsInput!) {
    updatePrivacySettings(settings: $settings) {
      id
      showEmail
      showPhone
    }
  }
`;

// Add other mutation definitions here if needed
