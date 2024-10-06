import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';

const Transaction = ({ transactionData }) => {
    console.log(transactionData);

    // State for transactions data
    const [transactions, setTransactions] = useState(transactionData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    // Filter state
    const [filter, setFilter] = useState('all');

    // Dummy data creation
    useEffect(() => {
        // Create dummy data for transactions
        // const dummyData = [
        //     { id: 1, transaction: "Vendor", transactionId: 'TXN001', amount: 100, status: 'Completed', date: '2024-09-01', account: 'Account A' },
        //     { id: 2, transaction: "Vendor", transactionId: 'TXN002', amount: -50, status: 'Pending', date: '2024-09-03', account: 'Account B' },
        //     { id: 3, transaction: "Ramesh", transactionId: 'TXN003', amount: 75, status: 'Failed', date: '2024-09-05', account: 'Account C' },
        //     { id: 4, transaction: "Suresh", transactionId: 'TXN004', amount: -20, status: 'Completed', date: '2024-09-06', account: 'Account D' },
        //     { id: 5, transaction: "Broadband", transactionId: 'TXN005', amount: 200, status: 'Completed', date: '2024-09-07', account: 'Account E' },
        //     // { id: 6, transaction: "Electric Bill", transactionId: 'TXN006', amount: -100, status: 'Pending', date: '2024-09-08', account: 'Account F' },
        //     // { id: 7, transaction: "Vendor", transactionId: 'TXN007', amount: 300, status: 'Completed', date: '2024-09-09', account: 'Account G' },
        //     // { id: 8, transaction: "Sandhya", transactionId: 'TXN008', amount: -150, status: 'Failed', date: '2024-09-10', account: 'Account H' },
        //     // { id: 9, transaction: "Manish", transactionId: 'TXN009', amount: 120, status: 'Completed', date: '2024-09-11', account: 'Account I' },
        //     // { id: 10, transaction: "Riddhi", transactionId: 'TXN010', amount: -30, status: 'Pending', date: '2024-09-12', account: 'Account J' },
        // ];

        // Simulate fetching data by setting a timeout
        setTimeout(() => {
            setTransactions(transactionData);
            setLoading(false);
        }, 500);
    }, []);
    console.log(transactionData);

    // Filter transactions based on the selected filter
    const filteredTransactions = transactionData.filter(transaction => {
        const now = new Date();
        const transactionDate = new Date(transaction.date); // Ensure this is a Date object
        switch (filter) {
            case 'day':
                return transactionDate.toDateString() === now.toDateString();
            case 'week':
                const oneWeekAgo = new Date();
                oneWeekAgo.setDate(now.getDate() - 7);
                return transactionDate >= oneWeekAgo && transactionDate <= now;
            case 'month':
                return transactionDate.getMonth() === now.getMonth() && transactionDate.getFullYear() === now.getFullYear();
            case 'year':
                return transactionDate.getFullYear() === now.getFullYear();
            default:
                return true;
        }
    });

    // Calculate total pages
    const totalPages = Math.ceil(filteredTransactions.length / recordsPerPage);

    // Calculate the current records to display
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredTransactions.slice(indexOfFirstRecord, indexOfLastRecord);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle filter change
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        setCurrentPage(1); // Reset to the first page when filter changes
    };

    // Generate PDF
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text('Transaction History', 20, 20);

        const tableColumn = ['Transaction ID', 'Amount', 'Date', 'Account'];
        const tableRows = [];

        filteredTransactions.forEach(transaction => {
            const transactionData = [
                transaction.transactionId,
                transaction.transactionType == "debit" ? `-$${Math.abs(transaction.transactionAmount)}` : `+$${transaction.transactionAmount}`,
                // transaction.status,
                new Date(transaction.date).toDateString(),
                transaction.recipientOrSenderAccountId,
            ];
            tableRows.push(transactionData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 30 });
        doc.save('transaction_history.pdf');
    };

    // // Render loading or error state
    // if (loading) {
    //     return <div className="flex-1 p-8 bg-gray-100">Loading...</div>;
    // }


    return (
        <div className="flex-1">
            <div className="mt-8">
                <div>
                    <table className="min-w-full mt-4 bg-white rounded-lg shadow">
                        <thead>
                            <tr className='bg-slate-100'>
                                <th className="py-3 px-4 text-left font-medium">Transaction</th>
                                <th className="py-3 px-4 text-left font-medium">Transaction ID</th>
                                <th className="py-3 px-4 text-left font-medium">Amount</th>
                                {/* <th className="py-3 px-4 text-left font-medium">Status</th> */}
                                <th className="py-3 px-4 text-left font-medium">Date</th>
                                <th className="py-3 px-4 text-left font-medium">Account</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!transactionData.length ? <p className='text-center text-red-500 p-2'>None of the transactions done yet!</p> : transactionData.map(transaction => (
                                // <tr key={transaction.transactionId}>
                                //     <td>Hi</td>
                                // </tr>
                                <tr key={transaction.transactionId} >
                                    <td className="py-3 px-4 flex gap-4 items-center"><div className='w-10 h-10 rounded-full bg-lightBlusih text-darkBulish font-medium shadow-lg flex justify-center items-center capitalize'>{(transaction.recipientOrSenderName[0])}</div><span className='capitalize'>{transaction.recipientOrSenderName}</span></td>
                                    <td className="py-3 px-4">TXN101-{transaction.transactionId}</td>
                                    <td className={`py-3 px-4 ${transaction.transactionType == "debit" ? 'text-red-500' : 'text-green-500'}`}>
                                        {transaction.transactionType == "debit" ? `- Rs.${Math.abs(transaction.transactionAmount)}` : ` + Rs.${transaction.transactionAmount}`}
                                    </td>
                                    {console.log(transaction.transactionDate)
                                    }
                                    {/* <td className={`${transaction.status == 'Completed' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"} text-sm font-medium flex items-center justify-center gap-2 rounded-full`}><div className={`w-[7px] h-[7px] ${transaction.status == 'Completed' ? "bg-green-400" : "bg-red-400"} rounded-full`}></div><div>{transaction.status}</div></td> */}
                                    <td className="py-3 px-4">{new Date(transaction.transactionDate).toDateString()}</td>
                                    <td className="py-3 px-4"><span className="text-blue-500">{transaction.recipientOrSenderAccountId}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                {/* Pagination controls */}
                {/* <div className="mt-4 flex justify-center">
                    {Array.from({ length: totalPages }, (v, i) => (
                        <button
                            key={i + 1}
                            onClick={() => handlePageChange(i + 1)}
                            className={`mx - 1 px - 3 py - 1 rounded - md ${ currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border'
                                }`}
                        >
                        {i + 1}
                    </button>
                    ))}
            </div> */}
            </div>
        </div>
    );
};

export default Transaction;