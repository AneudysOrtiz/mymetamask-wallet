import React, { useState } from "react";
import Swal from 'sweetalert2'
import { ethers } from "ethers";
import { Button, Card } from "react-bootstrap";
import { UserData } from "./models/UserData";
import { List } from "./components/List/List";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useApi } from "./hooks/useApi";
import { TrxForm } from "./components/TrxForm/TrxForm";
import { TrxFormData } from "./models/TrxFormData";
declare global {
  interface Window { ethereum: any; }
}

function App() {

  const { ethereum } = window;
  const { sendFunds } = useApi();
  const [showForm, setShowForm] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    address: "",
    balance: "",
  });

  const connectWallet = async () => {

    if (ethereum) {
      try {
        const response = await ethereum.request({ method: "eth_requestAccounts" })
        await setAccountInfo(response[0]);
      } catch (e: any) {
        Swal.fire({
          title: 'Error',
          text: e.message,
          icon: 'error',
        })
      }
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Install MetaMask extension',
        icon: 'error',
      })
    }
  };

  const setAccountInfo = async (address: string) => {
    const balance = await ethereum.request({
      method: "eth_getBalance",
      params: [address, "latest"]
    });

    setUserData({
      balance: ethers.utils.formatEther(balance),
      address
    });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  }

  const transferFunds = async (data?: TrxFormData) => {
    toggleForm();
    if (!data?.to || !data.value)
      return;

    try {
      const trxHash = await sendFunds(data?.to, data.value);
      Swal.fire({
        title: 'Success',
        html: `This is your Trx Hash: 
        <a href=https://rinkeby.etherscan.io/tx/${trxHash} target='_blank'>
        ${trxHash}
        </a>
        `,
        icon: 'success',
      })
    } catch (e: any) {
      Swal.fire({
        title: 'Error',
        text: e.message,
        icon: 'error',
      })
    }
  }

  return (
    <div className="App">
      <h1 className="AppTitle">MetaMask Wallet</h1>
      <Card>
        <Card.Header>
          <h3>User Info</h3>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Address: </strong>
            {userData.address}
          </Card.Text>
          <Card.Text>
            <strong>Balance: </strong>
            {userData.balance}
          </Card.Text>
          <Button onClick={connectWallet} variant="primary">
            {userData.address ? 'Refresh Info' : 'Connect to wallet'}
          </Button>
          <Button disabled={!userData.address} onClick={toggleForm} variant="success" className="SendButton">
            Send Funds
          </Button>
        </Card.Body>
      </Card>

      {userData.address && <List address={userData.address} />}

      <TrxForm show={showForm} onClose={transferFunds} />
    </div>
  );
}

export default App;
