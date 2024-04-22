import React, { useEffect, useState } from 'react';
import { connect, createDataItemSigner } from '@permaweb/aoconnect';
import './App.css';
import UserProfile from './components/UserProfile';

const App = () => {
  const [aoConnectInstance, setAOConnectInstance] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);

  const loadAOConnect = async () => {
    try {
      console.log('Connecting to AO...');
      const aoConnectInstance = connect({
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

      const address = await getWalletAddress();
      if (address) {
        setIsLoggedIn(true);
        setWalletAddress(address);
        await addUserDataToAOProcess(address);
        const userDataResult = await fetchOrCreateAOProcess(address);
        setUserData(userDataResult);
        await register(address);
        await fetchUserData(aoConnectInstance);

        setAOConnectInstance(aoConnectInstance);
      }
    } catch (error) {
      console.error('Error loading AOConnect:', error);
    }
  };

  console.log("User Data:", userData);

  useEffect(() => {
    loadAOConnect();
  }, []);

  const connectWallet = async () => {
    try {
      console.log('Connecting wallet...');
      await window.arweaveWallet.connect(['ACCESS_ADDRESS']);
      const address = await getWalletAddress();
      console.log('Wallet address:', address);
      if (address) {
        setIsLoggedIn(true);
        setWalletAddress(address);
        await addUserDataToAOProcess(address);
        await fetchOrCreateAOProcess(address);
        await register(address);
        await fetchUserData(aoConnectInstance);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const addUserDataToAOProcess = async (address) => {
    try {
      console.log('Adding user data to AO process...');
      const userDataMessage = {
        process: "n21B8o2SSGK_z9zOL-6YdzEbiKwmEz-sOyY_WedE2O0",
        tags: [
          { name: "Action", value: "register_user" }
        ],
        data: { UserData: JSON.stringify({ address }) }
      };

      const signDataItem = createDataItemSigner(window.arweaveWallet);
      const signedUserDataMessage = await signDataItem(userDataMessage);

      await aoConnectInstance.message(signedUserDataMessage);
      console.log('User data added to AO process');
    } catch (error) {
      console.error('Error adding user data to AO process:', error);
    }
  };

  const disconnectWallet = async () => {
    setIsLoggedIn(false);
    setUserData(null);
    setWalletAddress(null);
  };

  const register = async (address) => {
    try {
      console.log('Registering user...');
      const registrationMessage = {
        process: "n21B8o2SSGK_z9zOL-6YdzEbiKwmEz-sOyY_WedE2O0",
        tags: [
          { name: "Action", value: "register_user" },
          { name: "Address", value: address }
        ],
        data: { /* Additional registration data */ }
      };

      await aoConnectInstance.message(registrationMessage);
      console.log('User registered successfully');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

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

  const fetchOrCreateAOProcess = async (address) => {
    try {
      const { Messages } = await aoConnectInstance.message({
        process: "n21B8o2SSGK_z9zOL-6YdzEbiKwmEz-sOyY_WedE2O0",
        data: {
          action: "getUserData",
          address: address
        }
      });

      const { Output } = await aoConnectInstance.result({ message: Messages[0].id, process: "YOUR_EXISTING_PROCESS_ID" });

      if (Output) {
        console.log('Existing AO process ID:', Output.processId);
        return Output;
      } else {
        const newProcessId = await createAOProcess(address);
        console.log('New AO process ID:', newProcessId);
        return { processId: newProcessId };
      }
    } catch (error) {
      console.error('Error fetching or creating AO process:', error);
      return null;
    }
  };

  const createAOProcess = async (address) => {
    return "NEW_PROCESS_ID";
  };

  const getWalletAddress = async () => {
    if (window.arweaveWallet) {
      try {
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
          <button onClick={disconnectWallet}>Disconnect Wallet ({walletAddress})</button>
        </>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default App;
