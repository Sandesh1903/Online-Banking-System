

import React, { useState } from 'react';
import { FaHome, FaUniversity, FaHistory, FaExchangeAlt, FaLink, FaSignOutAlt } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { IoPersonCircle } from "react-icons/io5";
import { PiBankFill } from "react-icons/pi";
import { FaMoneyBill } from 'react-icons/fa6';


const Sidebar = ({ customerFirstName, customerLastName, customerEmail, customerId }) => {
    const [active, setActive] = useState(0);
    return (
        <div className="h-screen bg-white shadow-lg flex flex-col justify-between fixed">
            {/* Top Section */}
            <div>
                {/* Logo Section */}
                <div className="flex items-center justify-center py-5 border-b border-gray-200">
                    <PiBankFill size={45} className='text-darkBulish' />
                    <span className="text-2xl ms-2 font-bold text"> | Nova Bank</span>
                </div>

                {/* Navigation Items */}
                <nav className="mt-3">
                    <ul className='px-5'>
                        <li className="group">
                            <Link to="/dashboard" className={`${active == 0 && 'bg-darkBulish text-white hover:scale-105 duration-500'} text-darkBulish flex items-center w-full p-4 space-x-3 rounded-lg group`}
                                onClick={() => setActive(0)}>
                                <FaHome className="text-xl" />
                                <span className="font-medium">Home</span>
                            </Link>
                        </li>
                        <li className="group">
                            <Link to={`/my_accounts/${customerId}`} className={`${active == 1 && 'bg-darkBulish text-white hover:scale-105 duration-500'} text-darkBulish flex items-center w-full p-4 space-x-3 rounded-lg group`}
                                onClick={() => setActive(1)}>
                                <FaUniversity className="text-xl" />
                                <span className="font-medium">My Accounts</span>
                            </Link>
                        </li>
                        <li className="group">
                            <Link to={`/my_bills/${customerId}`} className={`${active == 1 && 'bg-darkBulish text-white hover:scale-105 duration-500'} text-darkBulish flex items-center w-full p-4 space-x-3 rounded-lg group`}
                                onClick={() => setActive(1)}>
                                <FaMoneyBill className="text-xl" />
                                <span className="font-medium">Pay Bills</span>
                            </Link>
                        </li>
                        <li className="group">
                            <Link to={`/txn_history/${customerId}`} className={`${active == 2 && 'bg-darkBulish text-white hover:scale-105 duration-500'} text-darkBulish flex items-center w-full p-4 space-x-3 rounded-lg group`} onClick={() => setActive(2)}>
                                <FaHistory className="text-xl" />
                                <span className="font-medium">Transaction History</span>
                            </Link>
                        </li>
                        <li className="group">
                            <Link to={`/make_payment/${customerId}`} className={`${active == 3 && 'bg-darkBulish text-white hover:scale-105 duration-500'} text-darkBulish flex items-center w-full p-4 space-x-3 rounded-lg group`}
                                onClick={() => setActive(3)}>
                                <FaExchangeAlt className="text-xl" />
                                <span className="font-medium">Payment Transfer</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Bottom Login Section */}
            <div className="border-t border-gray-200 p-4 flex items-center justify-between">
                <Link to="/profile" className="flex items-center">
                    <IoPersonCircle className="text-xl text-white-500 hover:text-blue-600 " />
                    <div className="ml-3">
                        <h4 className="font-medium text-gray-800">{customerFirstName} {customerLastName}</h4>
                        <p className="text-sm text-gray-500">{customerEmail}</p>
                    </div>
                </Link>
                <Link to="/logout"><FaSignOutAlt className="text-gray-400 hover:text-darkBulish cursor-pointer" title="Logout" />
                </Link>
            </div>

        </div>
    );
};

export default Sidebar;


