import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { formatDate } from '../utilities/DateFormating';

const MyAccounts = () => {
    const params = useParams();
    const [accounts, setAccounts] = useState([]);
    const [formattedDate, setFormattedDate] = useState(null);

    const getMaturityDate = (date, tenure) => {
        let maturityDate = new Date(date);
        maturityDate.setMonth(maturityDate.getMonth() + tenure);
        console.log(maturityDate);

        return formatDate(maturityDate)
    }

    const getAccounts = async () => {
        const response = await axios.get(`http://localhost:9999/account/getAccounts/${params.customerId}`, { withCredentials: true });
        console.log(response);
        setAccounts(response.data);
    }
    useEffect(() => {
        getAccounts();
    }, []);
    console.log(accounts);

    return (
        <div className='p-10'>
            <div className="flex-1">
                <h1 className='text-darkBulish font-semibold text-2xl'>All Accounts</h1>
                <div className="mt-5">
                    <div>
                        <table className="min-w-full mt-4 bg-white rounded-lg shadow">
                            <thead>
                                <tr className='bg-slate-100'>
                                    <th className="py-3 px-4 text-left font-medium">Account No.</th>
                                    <th className="py-3 px-4 text-left font-medium">Account Type</th>
                                    <th className="py-3 px-4 text-left font-medium">Amount</th>
                                    <th className="py-3 px-4 text-left font-medium">Tenure</th>
                                    <th className="py-3 px-4 text-left font-medium">Interest</th>
                                    <th className="py-3 px-4 text-left font-medium">Maturity Amount</th>
                                    <th className="py-3 px-4 text-left font-medium">Maturity Date</th>
                                    <th className="py-3 px-4 text-left font-medium">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accounts.length > 0 && accounts.map((account) => (
                                    <tr key={account.accountId}>
                                        <td className="py-3 px-4">{account.accountId}</td>
                                        <td className="py-3 px-4 capitalize">{account.accountType}</td>
                                        <td className="py-3 px-4">{account.accountBalance}</td>
                                        <td className="py-3 px-4">{(account.accountType == "savings" || account.accountType == "current") ? "-" : account.tenure}</td>
                                        <td className="py-3 px-4">{(account.accountType == "savings" || account.accountType == "current") ? "-" : account.interest + " %"}</td>
                                        <td className="py-3 px-4">
                                            {account.amountToBeCredited ? parseFloat(account.amountToBeCredited).toFixed(2) : '0.00'}
                                        </td>
                                        <td className="py-3 px-4">
                                            {(account.accountType == "savings" || account.accountType == "current") ? "-" : getMaturityDate(account.accountCreationDate, account.tenure)} {/* Directly call formatDate here */}
                                        </td>
                                        <td className="py-3 px-4">
                                            {formatDate(account.accountCreationDate)} {/* Directly call formatDate here */}
                                        </td>
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
            <div className='mt-5 float-end'>
                <Link to="/dashboard" className='bg-darkBulish text-white px-4 py-2 rounded-lg shadow-lg'>Back</Link>
            </div>
        </div>
    )
}

export default MyAccounts