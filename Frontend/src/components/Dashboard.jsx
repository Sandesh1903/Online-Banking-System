import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Home from './Home'
import axios from 'axios'

const Dashboard = () => {
    const [customerData, setCustomerData] = useState({});
    const getDashboardData = async () => {
        const response = await axios.get("http://localhost:9999/dashboard/", { withCredentials: true });
        console.log(response);
        setCustomerData(response.data);
    }
    useEffect(() => {
        getDashboardData();
    }, []);

    return (
        <div className='flex gap-7 justify-between bg-gray-100'>
            <div className='w-2/12'>
                <Sidebar customerFirstName={customerData.customerFirstName} customerLastName={customerData.customerLastName} customerEmail={customerData.customerEmail} customerId={customerData.customerId} />
            </div>
            <div className='w-full'>
                <Home customerData={customerData} />
            </div>
        </div>
    )
}

export default Dashboard