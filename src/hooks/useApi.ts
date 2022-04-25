import axios from "axios";
import { ethers } from "ethers";
import { Transaction } from "../models/Transaction";

export const useApi = () => {
    const BASE_URL = `https://api-rinkeby.etherscan.io/api?module=account`;
    const API_KEY = 'R44UN89J1M17MD7EYKAKTNRXYSSEDTGZN6';

    const getTransactions = async (address: string) => {
        const url = `${BASE_URL}&action=txlist&sort=desc&address=${address}&apikey=${API_KEY}`;
        const response = await axios.get(url);
        return response.data?.result as Transaction[];
    }

    const sendFunds = async (to: string, value: string) => {

        const { ethereum } = window;
        const transactionParameters = {
            to,
            from: ethereum.selectedAddress,
            value: ethers.utils.parseEther(value)._hex,
        };

        return ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });
    }

    return { getTransactions, sendFunds }
}