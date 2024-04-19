import React, { useEffect, useState } from 'react';
import { connect } from '@permaweb/aoconnect';
import './App.css';
import UserProfile from './components/UserProfile';

const App = () => {
  const [aoConnect, setAOConnect] = useState(null);
  const [userData, setUserData] = useState(null);
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
  
        console.log('Fetching user data...');
        const { Messages } = await aoConnectInstance.message({
          process: "n21B8o2SSGK_z9zOL-6YdzEbiKwmEz-sOyY_WedE2O0",
          data: "getUserData",
        });
  
        const { Output } = await aoConnectInstance.result({ message: Messages[0].id, process: "n21B8o2SSGK_z9zOL-6YdzEbiKwmEz-sOyY_WedE2O0" });
  
        console.log('User data retrieved:', Output);
  
        setUserData(Output);
        setAOConnect(aoConnectInstance);
      } catch (error) {
        console.error('Error loading AOConnect:', error);
      }
    };
  
    loadAOConnect();
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Welcome to Obroma Social Media</h1>
        <p>Connect with friends, share your thoughts, and explore the world of Obroma.</p>
      </header>
      {userData && <UserProfile userData={userData} />}
    </div>
  );
};

export default App;
