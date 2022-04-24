import React, { useState } from "react";
import Swal from 'sweetalert2'
import { ethers } from "ethers";
import { Button, Card } from "react-bootstrap";
import { UserData } from "./models/UserData";
import { List } from "./components/List/List";
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

  const { ethereum } = window;

  const connectWallet = async () => {

    if (ethereum) {
      try {
        const response = await ethereum.request({ method: "eth_requestAccounts" })
        await setAccountInfo(response[0]);
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
            {userData.address ? 'Refresh info' : 'Connect to wallet'}
          </Button>
        </Card.Body>
      </Card>

      {userData.address && <List address={userData.address} />}

    </div>
  );
}

export default App;
