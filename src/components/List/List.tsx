import React, { useCallback, useEffect, useState } from 'react'
import { useApi } from '../../hooks/useApi';
import { Table, Button } from "react-bootstrap";
import { Transaction } from '../../models/Transaction';
import { ethers } from 'ethers';
import './List.css'

export interface ListProps {
    address: string;
}

export const List = ({ address }: ListProps) => {
    const { getTransactions } = useApi();
    const [txList, setTxList] = useState<Transaction[]>([]);

    const fetchData = useCallback(async () => {
        const data = await getTransactions(address);
        if (Array.isArray(data))
            setTxList(data);
    }, []);

    const getLink = (hash: string) => {
        return `https://rinkeby.etherscan.io/tx/${hash}`
    }

    useEffect(() => {
        fetchData();
    }, [address]);

    return (
        <div className='ListContainer'>
            <div className="ListHeader">
                <h3>Transaction history</h3>
                <Button onClick={fetchData} size='sm' variant="secondary">
                    Refresh List
                </Button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Transaction Hash</th>
                        <th>Destination</th>
                        <th>Value</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {txList.map((tx) => {
                        return (
                            <tr key={tx.hash}>
                                <td>
                                    <a href={getLink(tx.hash)} target='_blank' rel='noreferrer'>
                                        {tx.hash}
                                    </a>
                                </td>
                                <td>{tx.to}</td>
                                <td>{ethers.utils.formatEther(tx.value)} ETH</td>
                                <td>{new Date(tx.timeStamp * 1000).toDateString()}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}
