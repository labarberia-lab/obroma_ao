// PrivacySettings.js

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_PRIVACY_SETTINGS_MUTATION } from '../graphql/mutations';

const PrivacySettings = ({ initialSettings }) => {
  const [settings, setSettings] = useState(initialSettings);
  const [updatePrivacySettings] = useMutation(UPDATE_PRIVACY_SETTINGS_MUTATION, {
    // Add refetchQueries if necessary
  });

  const handlePrivacyChange = (e) => {
    const { name, checked } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: checked
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await updatePrivacySettings({ variables: { settings } });
      // Optionally, show success message or redirect
    } catch (error) {
      // Handle error (e.g., display error message)
      console.error('Error updating privacy settings:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input 
          type="checkbox" 
          name="showEmail" 
          checked={settings.showEmail} 
          onChange={handlePrivacyChange} 
        />
        Show Email
      </label>
      <label>
        <input 
          type="checkbox" 
          name="showPhone" 
          checked={settings.showPhone} 
          onChange={handlePrivacyChange} 
        />
        Show Phone Number
      </label>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default PrivacySettings;
