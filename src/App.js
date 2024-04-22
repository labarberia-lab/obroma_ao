import React, { useEffect, useState } from 'react';
import { connect,  createDataItemSigner, message} from '@permaweb/aoconnect';
import UserProfile from './components/UserProfile';
import './App.css';

const processIds = { 
  OBROMA_PROCESS_ID: "n21B8o2SSGK_z9zOL-6YdzEbiKwmEz-sOyY_WedE2O0",
  OBROMA_TOKEN_PROCESS_ID: "u2dm_Gk38Q1QU78FuSSY8xqeoirCkMLzkIQukG-fgVw",
  CRED_PROCESS_ID: "Sa0iBLPNyJQrwpTTG-tWLQU-1QeUAJA73DdxGGiKoJc"
}

const ao = connect(
  {
    MU_URL: "https://mu.ao-testnet.xyz",
    CU_URL: "https://cu.ao-testnet.xyz",
    GATEWAY_URL: "https://arweave.net",
  },
);

console.log(ao);

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    console.log(walletAddress)
    if(walletAddress){
      register(walletAddress, processIds.OBROMA_PROCESS_ID);
    }
  },[walletAddress])


  const register = async (address, processIds) => {
    try {
      // Validate address and processIds.OBROMA_PROCESS_ID
      if (!address || !processIds.OBROMA_PROCESS_ID) {
        throw new Error('Invalid address or process ID');
      }
  
      // Wait for the wallet extension to be available
      await new Promise(resolve => {
        const interval = setInterval(() => {
          if (window.arweaveWallet) {
            clearInterval(interval);
            resolve();
          }
        }, 100); // Check every 100 milliseconds
      });
  
      // Send the message
      await message({
        process: processIds.OBROMA_PROCESS_ID,
        signer: createDataItemSigner(window.arweaveWallet),
        data: "Hello World!"
      });
  
      console.log("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const connectWallet = async () => {
    try {
      console.log('Connecting wallet...');
      // Check if the wallet extension is available
      if (!window.arweaveWallet) {
        console.error('Arweave wallet extension not available.');
        return;
      }
      // Connect to the wallet extension
      await window.arweaveWallet.connect(['ACCESS_ADDRESS']);
      const address = await window.arweaveWallet.getActiveAddress();
      console.log('Wallet address:', address);
      if (address) {
        setWalletAddress(address);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };


  const disconnectWallet = () => {
    console.log("Disconnect")
  }

  return (
  <div className="app-container">
      <header className="app-header">
          <h1>Welcome to Obroma Social Media</h1>
          <p>Connect with friends, share your thoughts, and explore the world of Obroma.</p>
      </header>
      <main className="app-content">
          {walletAddress ? (
              <div className="user-session">
                  {/* <UserProfile userData={userData} /> */}
                  <button className="button disconnect-button" onClick={disconnectWallet}>Disconnect Wallet ({walletAddress})</button>
              </div>
          ) : (
              <div className="wallet-connection">
                  <button className="button connect-button" onClick={connectWallet}>Connect Wallet</button>
              </div>
          )}
      </main>
  </div>
  );
};

export default App;
