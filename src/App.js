import React, { useEffect, useState } from 'react';
import { connect } from '@permaweb/aoconnect';
import './App.css';
import UserProfile from './components/UserProfile';

const App = () => {
  const [aoConnect, setAOConnect] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user's login state

  useEffect(() => {
    const loadAOConnect = async () => {
      try {
        console.log('Connecting to AO...');
        const aoConnectInstance = await connect({
          MU_URL: "https://mu.ao-testnet.xyz",
          CU_URL: "https://cu.ao-testnet.xyz",
          GATEWAY_URL: "https://arweave.net",
          processIds: { 
            OBROMA_PROCESS_ID: "n21B8o2SSGK_z9zOL-6YdzEbiKwmEz-sOyY_WedE2O0",
            OBROMA_TOKEN_PROCESS_ID: "u2dm_Gk38Q1QU78FuSSY8xqeoirCkMLzkIQukG-fgVw",
            CRED_PROCESS_ID: "Sa0iBLPNyJQrwpTTG-tWLQU-1QeUAJA73DdxGGiKoJc"
          }
        });
  
        console.log('AO Connected:', aoConnectInstance);

        // Check if user is already logged in
        const address = await getWalletAddress();
        if (address) {
          setIsLoggedIn(true);
          // Register user if not already registered
          await register(address);
          // Fetch user data
          await fetchUserData(aoConnectInstance);
        }

        setAOConnect(aoConnectInstance);
      } catch (error) {
        console.error('Error loading AOConnect:', error);
      }
    };
  
    loadAOConnect();
  }, []);

  // Function to connect the user's wallet
const connectWallet = async () => {
  try {
    // Request permission to access the user's wallet address
    await window.arweaveWallet.connect(['ACCESS_ADDRESS']);

    // Retrieve the wallet address after permission is granted
    const address = await getWalletAddress();
    console.log('Wallet address:', address); // Log the wallet address
    if (address) {
      setIsLoggedIn(true);
      
      // Fetch existing user data or create a new AO process
      const userData = await fetchOrCreateAOProcess(address);
      
      // Register user if not already registered
      await register(address);

      // Fetch user data after registration
      await fetchUserData(aoConnect);
    }
  } catch (error) {
    console.error('Error connecting wallet:', error);
    // Handle error, e.g., display a message to the user
  }
};

  // Function to disconnect the user's wallet
  const disconnectWallet = async () => {
    // Perform wallet disconnect logic
    setIsLoggedIn(false);
    setUserData(null);
  };

  // Function to register the user with the application
  const register = async (address) => {
    // Implement user registration logic
    // For example, send a message to AO network to register the user
  };

  // Function to fetch user data from the AO network
  const fetchUserData = async (aoConnectInstance) => {
    try {
      console.log('Fetching user data...');
      const { Messages } = await aoConnectInstance.message({
        process: "n21B8o2SSGK_z9zOL-6YdzEbiKwmEz-sOyY_WedE2O0",
        data: "getUserData",
      });

      const { Output } = await aoConnectInstance.result({ message: Messages[0].id, process: "n21B8o2SSGK_z9zOL-6YdzEbiKwmEz-sOyY_WedE2O0" });

      console.log('User data retrieved:', Output);

      setUserData(Output);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Function to fetch existing user data or create a new AO process
const fetchOrCreateAOProcess = async (address) => {
  try {
    // Fetch user data from the AO network
    const { Messages } = await aoConnect.message({
      process: "YOUR_EXISTING_PROCESS_ID",
      data: {
        action: "getUserData",
        address: address
      }
    });

    const { Output } = await aoConnect.result({ message: Messages[0].id, process: "YOUR_EXISTING_PROCESS_ID" });

    if (Output) {
      console.log('Existing AO process ID:', Output.processId); // Log the existing AO process ID
      return Output;
    } else {
      // Create a new AO process for the user
      const newProcessId = await createAOProcess(address);
      console.log('New AO process ID:', newProcessId); // Log the new AO process ID
      return { processId: newProcessId };
    }
  } catch (error) {
    console.error('Error fetching or creating AO process:', error);
    // Handle error, e.g., display a message to the user
    return null;
  }
};

  // Function to create a new AO process for the user
  const createAOProcess = async (address) => {
    // Implement logic to create a new AO process for the user
    // This can involve interacting with your backend API
    return "NEW_PROCESS_ID"; // Replace "NEW_PROCESS_ID" with the actual process ID
  };

  // Function to get the user's wallet address
  const getWalletAddress = async () => {
    // Check if the wallet provider is available
    if (window.arweaveWallet) {
      try {
        // Use the wallet provider to get the user's address
        const address = await window.arweaveWallet.getActiveAddress();
        return address;
      } catch (error) {
        console.error('Error retrieving wallet address:', error);
        return null;
      }
    } else {
      console.error('Arweave wallet provider not found.');
      return null;
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Welcome to Obroma Social Media</h1>
        <p>Connect with friends, share your thoughts, and explore the world of Obroma.</p>
      </header>
      {isLoggedIn ? (
        <>
          <UserProfile userData={userData} />
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
        </>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default App;
