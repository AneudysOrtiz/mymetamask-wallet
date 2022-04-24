import axios from "axios";
import { Transaction } from "../models/Transaction";

export const useApi = () => {
    const BASE_URL = `https://api-rinkeby.etherscan.io/api?module=account`;
    const API_KEY = 'R44UN89J1M17MD7EYKAKTNRXYSSEDTGZN6';

    const getTransactions = async (address: string) => {
        const url = `${BASE_URL}&action=txlist&sort=desc&address=${address}&apikey=${API_KEY}`;
        const response = await axios.get(url);
        return response.data?.result as Transaction[];
    }

    return { getTransactions }
}