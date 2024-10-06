import React, { useState } from 'react';
import Login from '../assets/images/Logo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OTPPage from './OTPpage';
import { logout } from '../auth/logout';
import { BiLoaderCircle } from "react-icons/bi";

const LoginPage = () => {

    // clearCookies
    logout();

    const [isLoading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        customerId: "",
        customerPassword: ""
    })
    const [errors, setErrors] = useState({});
    const navigator = useNavigate();

    const validateCustomerId = (id) => {
        const regex = /^\d{7,}$/; // Customer ID should be a number with at least 6 digits
        return regex.test(id);
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
        return regex.test(password);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }))
    }
    const handleBlur = (e) => {
        const { name } = e.target
        let error = ""

        if (name === 'customerId') {
            if (!formData.customerId) {
                error = 'Customer ID is required.';
            }
            else if (formData.customerId && !validateCustomerId(formData.customerId)) {
                error = 'Customer ID must be a number with at least 7 digits.';
            } else {
                error = ''
            }
        }

        if (name === 'customerPassword') {
            if (!formData.customerPassword) {
                error = 'Password is required';
            }
            else if (formData.customerPassword && !validatePassword(formData.customerPassword)) {
                error = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
            } else {
                error = ''
            }
        }

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.customerId) {
            newErrors.customerId = 'Customer ID is required.';
        }

        if (!formData.customerPassword) {
            newErrors.customerPassword = 'Password is required';
        }
        if (formData.customerId && !validateCustomerId(formData.customerId)) {
            newErrors.customerPassword = 'Customer ID must be a number with at least 6 digits.';
        }

        if (formData.customerPassword && !validatePassword(formData.customerPassword)) {
            newErrors.customerPassword = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        console.log(formData)
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:9999/customer/login", formData, { withCredentials: true });
            setLoading(false);
            let status = response.status
            let data = response.data
            if (status == 200 && data == "VALID CREDENTIALS") {
                toast.success('Valid credentials..!')
                navigator(`/otp/${"dashboard"}`)
            }
        } catch (error) {
            setLoading(false);
            let status = error.response.status
            let data = error.response.data
            if (status == 401 && data == "INVALID CREDENTIALS") {
                toast.error('Invalid credentials..!')
            }
            else if (status == 401 && data == "ACCOUNT NOT VERIFIED") {
                toast.warning('Please verify your email to login..!')
            }

        }

    };

    return (
        <div className=" bg-gray-100">

            <div className="bg-white  flex  justify-center items-center mx-full w-full h-screen ">
                <div className="w-1/2 p-5">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Log in</h2>
                    <p className="text-sm text-gray-600 text-center mb-8">
                        Welcome back! Please enter your details.
                    </p>

                    <form className=" bg-white border-0 shadow-none w-[80%] mx-auto">
                        <div className="my-3">
                            <label className="block text-sm font-medium text-gray-700">Customer ID:</label>
                            <input
                                type="text"
                                name='customerId'
                                value={formData.customerId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.customerId && <p className="text-red-500 text-xs mt-1">{errors.customerId}</p>}
                        </div>

                        <div className="my-3">
                            <label className="block text-sm font-medium text-gray-700">Password:</label>
                            <input
                                type="password"
                                name="customerPassword"
                                value={formData.customerPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.customerPassword && <p className="text-red-500 text-xs mt-1">{errors.customerPassword}</p>}
                        </div>

                        <div className="flex items-center justify-between my-3">
                            <a href="" onClick={() => { navigator("/email") }} className="text-sm font-medium text-indigo-600 hover:underline">Forgot Password?</a>
                            <a href="" onClick={() => { navigator("/register") }} className="text-sm font-medium text-indigo-600  hover:underline">New User? Sign up</a>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`${isLoading && 'cursor-not-allowed'} group relative w-full flex justify-center items-center gap-3 py-2 px-4 border transition hover:scale-[1.01] duration-300 border-transparent font-medium rounded-md text-white bg-darkBulish hover:bg-mediumBluish focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            onClick={handleLogin}
                        >
                            Login {isLoading && <BiLoaderCircle size={20} className='text-white animate-fade-in animate-fade-spin' />}
                        </button>
                    </form>
                </div>

                <div className="w-1/2  ">
                    <img
                        src={Login}
                        alt="Logo"
                        className="w-3/4 mx-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
