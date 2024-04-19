import React from 'react';

const UserProfile = ({ userData }) => {
  if (!userData) {
    return <div>Loading...</div>; // Add loading indicator while data is being fetched
  }

  const { 
    username, 
    bio, 
    avatarUrl, 
    location, 
    website,
    joinedDate,
    totalPosts,
    totalFollowers,
    totalFollowing,
    socialMediaLinks,
    emailAddress,
    phoneNumber,
    interests,
    skills,
    education,
    workExperience,
    favoriteQuotes,
    status,
    language
  } = userData;

  return (
    <div className="flex items-center border-b border-gray-300 pb-4 mb-4">
      <img src={avatarUrl} alt={username} className="w-12 h-12 rounded-full mr-4" />
      <div>
        <h2 className="text-lg font-bold">{username}</h2>
        <p className="text-sm text-gray-600">{bio}</p>
        {/* Additional user information fields */}
        <div className="mt-2 flex flex-wrap">
          {location && (
            <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2">
              Location: {location}
            </div>
          )}
          {website && (
            <a href={website} target="_blank" rel="noopener noreferrer" className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2">
              Website
            </a>
          )}
          {joinedDate && (
            <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2">
              Joined: {joinedDate}
            </div>
          )}
          {totalPosts && (
            <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2">
              Total Posts: {totalPosts}
            </div>
          )}
          {totalFollowers && (
            <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2">
              Followers: {totalFollowers}
            </div>
          )}
          {totalFollowing && (
            <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2">
              Following: {totalFollowing}
            </div>
          )}
          {socialMediaLinks && (
            <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2">
              Social Media: {socialMediaLinks}
            </div>
          )}
          {emailAddress && (
            <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2">
              Email: {emailAddress}
            </div>
          )}
          {phoneNumber && (
            <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2">
              Phone: {phoneNumber}
            </div>
          )}
          {interests && (
            <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2">
              Interests: {interests}
            </div>
          )}
          {skills && (
            <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2">
              Skills: {skills}
            </div>
          )}
          {education && (
            <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2">
              Education: {education}
            </div>
          )}
          {workExperience && (
            <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2">
              Work Experience: {workExperience}
            </div>
          )}
          {favoriteQuotes && (
            <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2">
              Favorite Quotes: {favoriteQuotes}
            </div>
          )}
          {status && (
            <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2">
              Status: {status}
            </div>
          )}
          {language && (
            <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2">
              Language: {language}
            </div>
          )}
          {/* Add more user information tags here */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
