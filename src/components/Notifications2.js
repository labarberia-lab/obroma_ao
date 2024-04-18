// Notifications.js

import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_NOTIFICATIONS_QUERY } from '../graphql/queries';

const Notifications = () => {
  // Assuming GET_NOTIFICATIONS_QUERY fetches the user's notifications
  const { loading, error, data } = useQuery(GET_NOTIFICATIONS_QUERY);

  if (loading) return <p>Loading notifications...</p>;
  if (error) return <p>Error fetching notifications: {error.message}</p>;

  const notifications = data.notifications;

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>
              {notification.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
