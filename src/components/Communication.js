// SearchAndDiscovery.js

import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_USERS_QUERY, SEARCH_CONTENT_QUERY } from '../graphql/queries';

const SearchAndDiscovery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { loading, error, data } = useQuery(SEARCH_USERS_QUERY, {
    variables: { query: searchQuery },
    skip: !searchQuery // Skip query if searchQuery is empty
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Fetch search results for users or content based on search query
    // Use SEARCH_USERS_QUERY or SEARCH_CONTENT_QUERY based on requirement
    // Update setSearchResults with fetched results
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input 
          type="text" 
          value={searchQuery} 
          onChange={handleSearchChange} 
          placeholder="Search..." 
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {/* Display search results */}
        {searchResults.map(result => (
          <div key={result.id}>
            {/* Display user or content information */}
            <p>{result.name || result.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchAndDiscovery;
