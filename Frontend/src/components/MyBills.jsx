import React from 'react'
import { BiBulb, BiMobileAlt } from 'react-icons/bi';
import { IoMdWifi } from "react-icons/io";
import { GiGasStove } from "react-icons/gi";
import { FaHouse } from 'react-icons/fa6';
import { GrVmMaintenance } from 'react-icons/gr';
import { Link, useParams } from 'react-router-dom';


const MyBills = () => {
    const { customerId } = useParams();
    console.log(customerId);

    return (
        <div className=''>
            <div className="bg-darkBulish p-5">
                <h1 className='text-white text-lg font-bold'>
                    My Bills
                </h1>
            </div>
            <div className='mt-10 flex gap-10 items-center px-5'>
                <div className='border shadow-md pt-1'>
                    <IoMdWifi className='text-darkBulish mx-auto p-2' size={80} />
                    <Link to={`/my_billform/broadband/${customerId}`} className='p-2 bg-gradient-to-r from-[#5f9cff] to-[#154884] text-white '>Pay Wifi Bill</Link>
                </div>
                <div className='border shadow-md pt-1'>
                    <BiBulb className='text-darkBulish mx-auto p-2' size={80} />
                    <Link to={`/my_billform/electricity/${customerId}`} className='p-2 bg-gradient-to-r from-[#5f9cff] to-[#154884] text-white '>Pay Electric Bill</Link>
                </div>
                <div className='border shadow-md pt-1'>
                    <GiGasStove className='text-darkBulish mx-auto p-2' size={80} />
                    <Link to={`/my_billform/gas/${customerId}`} className='p-2 bg-gradient-to-r from-[#5f9cff] to-[#154884] text-white'>Book LPG Gas</Link>
                </div>
                <div className='border shadow-md pt-1'>
                    <BiMobileAlt className='text-darkBulish mx-auto p-2' size={80} />
                    <Link to={`/my_billform/mobile/${customerId}`} className='p-2 bg-gradient-to-r from-[#5f9cff] to-[#154884] text-white'>Mobile Recharge</Link>
                </div>
                <div className='border shadow-md pt-1'>
                    <FaHouse className='text-darkBulish mx-auto p-2' size={80} />
                    <Link to={`/my_billform/rent/${customerId}`} className='p-2 bg-gradient-to-r from-[#5f9cff] to-[#154884] text-white'>Pay House Rent</Link>
                </div>
            </div>
        </div>
    )
}

export default MyBills