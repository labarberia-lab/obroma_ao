// ArConnectLogin.js

import React from 'react';
import ArConnect from '@arconnect/arconnect';

const ArConnectLogin = () => {
  const arConnect = new ArConnect();

  const handleLogin = async () => {
    try {
      // Connect to ArConnect wallet
      await arConnect.connect(['ACCESS_ADDRESS']);
      // Get wallet address
      const address = await arConnect.getActiveAddress();
      console.log('Connected wallet address:', address);
      // Optionally, perform further actions like authentication or redirect
    } catch (error) {
      console.error('Error connecting to ArConnect:', error);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Connect with ArConnect</button>
    </div>
  );
};

export default ArConnectLogin;
