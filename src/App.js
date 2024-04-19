import React, { useEffect, useState } from 'react';
import { connect } from '@permaweb/aoconnect';
import './App.css';
import UserProfile from './components/UserProfile';
import Connectivity from './components/Connectivity';
import Communication from './components/Communication';
import ContentSharing from './components/ContentSharing';
import Notifications from './components/Notifications';
import PrivacySettings from './components/PrivacySettings';
import SearchAndDiscovery from './components/SearchAndDiscovery';
import RecommendationSystems from './components/RecommendationSystems';
import Integration from './components/Integration';
import DecentralizedFeatures from './components/DecentralizedFeatures';
import MobileAccessibility from './components/MobileAccessibility';

const App = () => {
  const [aoConnect, setAOConnect] = useState(null);
  const [userData, setUserData] = useState(null);

  const loadAOConnect = async () => {
    try {
      const { result, results, message, spawn, monitor, unmonitor, dryrun } = connect({
        MU_URL: "https://mu.ao-testnet.xyz",
        CU_URL: "https://cu.ao-testnet.xyz",
        GATEWAY_URL: "https://arweave.net",
        processIds: { 
          OBROMA_PROCESS_ID: "n21B8o2SSGK_z9zOL-6YdzEbiKwmEz-sOyY_WedE2O0",
          OBROMA_TOKEN_PROCESS_ID: "u2dm_Gk38Q1QU78FuSSY8xqeoirCkMLzkIQukG-fgVw",
          CRED_PROCESS_ID: "Sa0iBLPNyJQrwpTTG-tWLQU-1QeUAJA73DdxGGiKoJc"
        }
      });

      // Fetch user data from the specified process
      const { Messages } = await message({
        process: "n21B8o2SSGK_z9zOL-6YdzEbiKwmEz-sOyY_WedE2O0",
        data: "getUserData",
      });

      const { Output } = await result({ message: Messages[0].id, process: "n21B8o2SSGK_z9zOL-6YdzEbiKwmEz-sOyY_WedE2O0" });

      setUserData(Output);

      setAOConnect({ result, results, message, spawn, monitor, unmonitor, dryrun });
    } catch (error) {
      console.error('Error loading AOConnect:', error);
    }
  };

  useEffect(() => {
    loadAOConnect();
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Welcome to Obroma Social Media</h1>
        <p>Connect with friends, share your thoughts, and explore the world of Obroma.</p>
      </header>
      <UserProfile aoConnect={aoConnect} userData={userData} />
      <Connectivity aoConnect={aoConnect} />
      <Communication aoConnect={aoConnect} />
      <ContentSharing aoConnect={aoConnect} />
      <Notifications aoConnect={aoConnect} />
      <PrivacySettings aoConnect={aoConnect} />
      <SearchAndDiscovery aoConnect={aoConnect} />
      <RecommendationSystems aoConnect={aoConnect} />
      <Integration aoConnect={aoConnect} />
      <DecentralizedFeatures aoConnect={aoConnect} />
      <MobileAccessibility aoConnect={aoConnect} />
    </div>
  );
};

export default App;
