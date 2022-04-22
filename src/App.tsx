import React, { useState } from "react";
import Swal from 'sweetalert2'
import { ethers } from "ethers";
import { Button, Card } from "react-bootstrap";
import { UserData } from "./models/UserData";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
declare global {
  interface Window { ethereum: any; }
}

function App() {

  const [userData, setUserData] = useState<UserData>({
    address: "",
    balance: "",
  });

  const connectWallet = async () => {

    if (window.ethereum) {
      try {
        const response = await window.ethereum.request({ method: "eth_requestAccounts" })
        setAccountInfo(response[0]);
      } catch (e) {
        console.log(e)
        Swal.fire({
          title: 'Error',
          text: JSON.stringify(e),
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

  const setAccountInfo = (address: string) => {
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [address, "latest"]
      })
      .then((balance: string) => {
        setUserData({
          balance: ethers.utils.formatEther(balance),
          address
        });
      });
  };

  return (
    <div className="App">
      <h1 className="AppTitle">MetaMask Wallet</h1>
      <Card>
        <Card.Header>
          <strong>Address: </strong>
          {userData.address}
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Balance: </strong>
            {userData.balance}
          </Card.Text>
          <Button onClick={connectWallet} variant="primary">
            Connect to wallet
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
