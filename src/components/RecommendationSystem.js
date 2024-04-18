// RecommendationSystem.js

import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_RECOMMENDATIONS_QUERY } from '../graphql/queries';

const RecommendationSystem = ({ userId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const { loading, error, data } = useQuery(GET_RECOMMENDATIONS_QUERY, {
    variables: { userId },
    // Add any additional options like polling or fetchPolicy if necessary
  });

  useEffect(() => {
    if (data) {
      setRecommendations(data.recommendations);
    }
  }, [data]);

  if (loading) return <p>Loading recommendations...</p>;
  if (error) return <p>Error fetching recommendations: {error.message}</p>;

  return (
    <div>
      <h2>Recommended Content</h2>
      {recommendations.length === 0 ? (
        <p>No recommendations</p>
      ) : (
        <ul>
          {recommendations.map((recommendation) => (
            <li key={recommendation.id}>
              {recommendation.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecommendationSystem;
