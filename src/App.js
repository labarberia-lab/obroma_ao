import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import Arweave from 'arweave';
import { connect } from '@permaweb/aoconnect';
import './App.css'; // Import your CSS file for styling
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
  // State to store the AOConnect instance
  const [aoConnect, setAOConnect] = useState(null);

  // Function to load AOConnect
  const loadAOConnect = async () => {
    try {
      const arweave = Arweave.init();
      // Connect to a specific MU, CU, and gateway
      const { result, results, message, spawn, monitor, unmonitor, dryrun } = connect({
        MU_URL: "https://mu.ao-testnet.xyz",
        CU_URL: "https://cu.ao-testnet.xyz",
        GATEWAY_URL: "https://arweave.net",
      });
      setAOConnect({ result, results, message, spawn, monitor, unmonitor, dryrun });
    } catch (error) {
      console.error('Error loading AOConnect:', error);
    }
  };

  // Load AOConnect on component mount
  useEffect(() => {
    loadAOConnect();
  }, []);

  return (
    <div className="app-container">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {/* Your components */}
      {/* Pass aoConnect instance as props to components that need it */}
      <UserProfile aoConnect={aoConnect} />
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
