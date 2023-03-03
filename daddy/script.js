// Import the required libraries
const Web3 = require('web3');
const { ethers } = require("ethers");

const contractAbi = require('./package.json'); // Replace with your contract ABI

// Define the contract address
const contractAddress = "0xcc2bDFAA45FD5fe6021117F198491134C3F75aE9"; // Replace with your contract address

// Initialize the web3 object
const web3 = new Web3(Web3.givenProvider || "https://sphinx.shardeum.org/");

// Check if Metamask is installed
if (typeof window.ethereum !== 'undefined') {
  console.log('Metamask is installed!');
} else {
  console.log('Metamask is not installed.');
}

// Define the function to connect the wallet
async function connectWallet() {
  try {
    // Request account access if needed
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Get the selected account
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    const selectedAccount = accounts[0];

    // Update the UI with the connected wallet address
    document.getElementById('connected-wallet').textContent = selectedAccount;
  } catch (error) {
    console.error(error);
  }
}

// Define the function to verify the player's win
async function verifyWin() {
  try {
    // Get the player's address
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    // Call the verifyWin function in the contract
    const result = await contract.methods.verifyWin(address).call();
    // Update the UI with the result
    document.getElementById('player-win').innerHTML = result;
  } catch (error) {
    console.log(error);
  }
}

// Call the connectWallet function when the connect wallet button is clicked
document.getElementById('connect-wallet').addEventListener('click', connectWallet);

// Call the verifyWin function when the verify win button is clicked
document.getElementById('verify-win').addEventListener('click', verifyWin);

