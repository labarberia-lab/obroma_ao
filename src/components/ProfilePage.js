// Example usage in another component
import React from 'react';
import UserProfile from './UserProfile';

const ProfilePage = () => {
  const user = {
    username: 'example_user',
    bio: 'A software engineer passionate about decentralized technologies!',
    avatarUrl: 'https://example.com/avatar.jpg',
    // Add more user information fields here
  };

  return (
    <div>
      <h1>User Profile</h1>
      <UserProfile {...user} />
    </div>
  );
};

export default ProfilePage;
