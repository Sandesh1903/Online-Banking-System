import React, { useEffect, useState } from 'react';
import { GrMoney } from "react-icons/gr";
import { FaSackDollar } from "react-icons/fa6";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaRupeeSign } from 'react-icons/fa';
import Transaction from './Transaction';

// Card component
const Card = ({ children, className }) => {
    return (
        <div className={`p-4 rounded-lg shadow-lg ${className}`}>
            {children}
        </div>
    );
};

const Home = ({ customerData }) => {
    // State for data
    const navigator = useNavigate()
    const [FDAccounts, setFDAccounts] = useState(0);
    const [RDAccounts, setRDAccounts] = useState(0);
    const [SavingsAccounts, setSavingsAccounts] = useState(0);
    const [CurrentAccounts, setCurrentAccounts] = useState(0);
    const [accounts, setAccounts] = useState([]);
    const [transaction, setTransaction] = useState([]);

    const getRecenTransactions = async () => {
        const response = await axios.get("http://localhost:9999/transaction/recent_transactions", { withCredentials: true });
        console.log("recent_txn", response);
        setTransaction(response.data);
    }

    const getAccountData = async () => {
        const response = await axios.get("http://localhost:9999/dashboard/", { withCredentials: true });
        // console.log(response);
        setAccounts(response.data.account);
    }
    useEffect(() => {
        getAccountData();
        getRecenTransactions();
    }, []);

    const getTotalBalance = () => {

        let fd = 0;
        let rd = 0;
        let savings = 0;
        let current = 0;

        console.log("Accounts Data:", accounts);  // Log accounts to see if data is being passed correctly
        console.log("hee");

        if (accounts && accounts.length > 0) {
            accounts.forEach(account => {
                // Log each account to verify the account type
                console.log("Processing Account Type:", account.accountType);

                switch (account.accountType.toLowerCase()) {  // Convert to lowercase to avoid case sensitivity issues
                    case 'savings':
                        savings++;
                        break;
                    case 'current':
                        current++;
                        break;
                    case 'fixed_deposit':  // Ensure the case matches the data
                        fd++;
                        break;
                    case 'recurring _deposit':  // Ensure the case matches the data
                        rd++;
                        break;
                    default:
                        console.warn(`Unknown account type: ${account.accountType}`);
                        break;
                }
            });

            // Update the state after iterating through all accounts
            setCurrentAccounts(current);
            setSavingsAccounts(savings);
            setRDAccounts(rd);
            setFDAccounts(fd);

            console.log("Updated Savings:", savings, "Current:", current, "FD:", fd, "RD:", rd);
        } else {
            console.warn("No accounts available or accounts list is empty");
        }
    };

    useEffect(() => {
        console.log("hii");
        getTotalBalance();
    }, [accounts]);



    return (
        <div className="w-full justify-center p-8 bg-gray-50 min-h-screen">
            <div className="px-10 w-full">
                <h1 className="text-2xl font-semibold">
                    Welcome, <span className="text-blue-600">{customerData.customerFirstName}</span>
                </h1>
                <p className="text-gray-500 mt-2">Access & manage your account and transactions efficiently.</p>

                <Card className="mt-5 bg-white rounded-lg shadow-lg w-full">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-medium">Bank Accounts <span className='text-darkBulish font-bold text-xl'>{customerData.account && customerData.account.length}</span></h2>
                            <div className="flex justify-between gap-5">
                                <div>
                                    <p className="bg-gradient-to-r from-[#5f9cff] to-[#154884] text-white mt-3 px-5 py-1 rounded-full">Savings <b className='ml-2 text-lg'>{SavingsAccounts}</b></p>
                                    {/* <p className="text-2xl font-semibold mt-2 text-darkBulish flex items-center gap-2">{SavingsAccounts}</p> */}
                                </div>
                                <div>
                                    <p className="bg-gradient-to-r from-[#5f9cff] to-[#154884] text-white mt-3 px-5 py-1 rounded-full">Current <b className='ml-2 text-lg'>{CurrentAccounts}</b></p>
                                    {/* <p className="text-gray-500 mt-3">Current</p>
                                    <p className="text-2xl font-semibold mt-2 text-darkBulish flex items-center gap-2">{CurrentAccounts}</p> */}
                                </div>
                                <div>
                                    <p className="bg-gradient-to-r from-[#5f9cff] to-[#154884] text-white mt-3 px-5 py-1 rounded-full">Fixed Deposit <b className='ml-2 text-lg'>{FDAccounts}</b></p>
                                    {/* <p className="text-gray-500 mt-3">Fixed Deposit</p>
                                    <p className="text-2xl font-semibold mt-2 text-darkBulish flex items-center gap-2">{FDAccounts}</p> */}
                                </div>
                                <div>
                                    <p className="bg-gradient-to-r from-[#5f9cff] to-[#154884] text-white mt-3 px-5 py-1 rounded-full">Recurring Deposit <b className='ml-2 text-lg'>{RDAccounts}</b></p>
                                    {/* <p className="text-gray-500 mt-3">Recurring Deposit</p>
                                    <p className="text-2xl font-semibold mt-2 text-darkBulish flex items-center gap-2">{RDAccounts}</p> */}
                                </div>

                            </div>
                        </div>
                        <div className="text-blue-600 hover:text-blue-800 text-sm">
                            <button onClick={() => { navigator(`/add_account/${customerData.customerId}`) }} className="shadow-lg px-5 py-2 bg-gradient-to-r from-[#5f9cff] to-[#154884] text-white rounded-full font-medium text-md hover:bg-gradient hover:from-white hover:to-white hover:border-[#154884] hover:border hover:text-[#154884]">+ Create account</button>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="px-10 w-full">
                {/* <h2 className="text-2xl font-semibold mb-6">My Accounts</h2>
                <div className="grid grid-cols-3 gap-10">
                    {options.map((option, index) => (
                        <Card
                            className="bg-gradient-to-r from-[#5f9cff] to-[#154884] p-5 rounded-lg shadow-xl h-32 flex justify-center items-center text-white cursor-pointer transition transform hover:scale-105"
                            key={index}
                        >
                            <div className="font-bold flex gap-3 items-center">
                                <h3 className='text-4xl'>{option.icon}</h3>
                                <h3 className='text-2xl'>{option.title}</h3>
                            </div>
                        </Card>
                    ))}
                </div> */}
                <Transaction transactionData={transaction} />
            </div>
        </div>
    );
};

export default Home;
