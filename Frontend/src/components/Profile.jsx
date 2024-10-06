import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { FaEnvelope, FaPhoneAlt, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { formatDate } from '../utilities/DateFormating';

const Profile = () => {
    const [customerData, setCustomerData] = useState({});
    const [formattedDate, setFormattedDate] = useState(null);
    const getDashboardData = async () => {
        const response = await axios.get("http://localhost:9999/dashboard/", { withCredentials: true });
        console.log(response);
        setCustomerData(response.data);
        if (response.data) {
            let date = await formatDate(response.data.customerRegistrationDate);
            setFormattedDate(date);
        }
    }
    useEffect(() => {
        getDashboardData();
    }, []);

    return (
        <div className='h-screen bg-lightBlusih overflow-hidden'>
            <div className='bg-darkBulish h-60 w-full overflow-hidden'>
            </div>
            <div className='flex justify-center w-full'>
                <div className="w-3/4 fixed top-20 mx-auto bg-white shadow-lg rounded-lg">
                    <div className="flex p-6">
                        {/* Left Section */}
                        <div className="w-1/3 flex flex-col items-center border-spacing-2 border-r-2">
                            <div className="rounded-full overflow-hidden h-20 w-20 bg-lightBlusih flex justify-center items-center">
                                {/* Placeholder for user image */}
                                <BiUserCircle className='text-darkBulish' size={70} />
                            </div>

                            <h2 className="text-xl font-semibold text-gray-700">{customerData.customerFirstName} {customerData.customerLastName}</h2>
                            <p className="text-sm text-gray-500">Customer ID: {customerData.customerId}</p>

                            <p className="text-sm font-medium text-gray-700 mt-6">
                                <span className="flex items-center">
                                    <FaEnvelope className="w-5 h-5 text-blue-500 mr-2" />
                                    {customerData.customerEmail}
                                </span>
                            </p>
                            <p className="text-sm font-medium text-gray-700 mt-4">
                                <span className="flex items-center">
                                    <FaPhoneAlt className="w-5 h-5 text-blue-500 mr-2" />
                                    {customerData.customerMobileNo}
                                </span>
                            </p>

                            <div className='mt-10'>
                                <Link to={`/reset_password?customerEmail=${customerData.customerEmail}`} className="bg-darkBulish px-3 py-2 text-white hover:bg-blue-600 rounded-md">
                                    Reset Password
                                </Link>
                            </div>

                            {/* <p className="text-sm font-bold text-gray-700 mt-4 ">Account No: </p> */}
                        </div>

                        {/* Right Section */}

                        <div className="w-2/3 px-10">
                            <h3 className="text-xl font-medium text-gray-800">User Profile</h3>
                            <div className="grid grid-cols-2 gap-5 mt-4">

                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500">First Name</h4>
                                    <p className="text-md text-gray-700">{customerData.customerFirstName}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500">Last Name</h4>
                                    <p className="text-md text-gray-700">{customerData.customerLastName}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500">Email Address</h4>
                                    <p className="text-md text-gray-700">{customerData.customerEmail}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500">Phone</h4>
                                    <p className="text-md text-gray-700">{customerData.customerMobileNo}</p>
                                </div>
                                {/* <button className="text-blue-600 hover:underline flex items-center">
                                    <FaEdit className="mr-2" /> Edit
                                </button> */}

                            </div>

                            <div className="mt-5">
                                {/* <h4 className="text-sm font-semibold text-gray-500">Address</h4> */}
                                <div className="grid grid-cols-2 gap-4 mt-2">
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-500">Address</h4>
                                        <p className="text-md text-gray-700">{customerData.customerAddress}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-500">Aadhar Number</h4>
                                        <p className="text-md text-gray-700">{customerData.customerAadharCardNumber}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-500">Pan card Number</h4>
                                        <p className="text-md text-gray-700">{customerData.customerPANCardNumber}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-500">Account Created On</h4>
                                        <p className="text-md text-gray-700">{formattedDate}</p>
                                    </div>

                                </div>
                            </div>

                            {/* <div className="mt-8">
                                <h4 className="text-sm font-semibold text-gray-500">Account Details</h4>
                                <div className="grid grid-cols-2 gap-4 mt-2">
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-500">Account Created On</h4>
                                        <p className="text-md text-gray-700">{customerData.customerRegistrationDate}</p>
                                    </div>
                                    <div>
                                        <button className="text-blue-600 hover:underline">
                                            Reset Password
                                        </button>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="bg-gray-50 p-5 flex justify-end border-t-darkBulish border-t-[1px] rounded-b-lg">
                        <Link to="/dashboard" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                            Close
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;