import React from 'react';

const UserProfile = ({ username, bio, avatarUrl }) => {
  return (
    <div className="flex items-center">
      <img src={avatarUrl} alt={username} className="w-12 h-12 rounded-full mr-4" />
      <div>
        <h2 className="text-lg font-bold">{username}</h2>
        <p className="text-sm text-gray-600">{bio}</p>
        {/* Add more user information fields here */}
      </div>
    </div>
  );
};

export default UserProfile;
