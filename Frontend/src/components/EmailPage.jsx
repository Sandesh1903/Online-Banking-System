import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmailPage = () => {
    const navigator = useNavigate()
    const [formData, setformData] = useState({
        customerEmail: "",
    });

    const [formError, setFormError] = useState({
        customerEmail: "",
    });

    const handleUserInput = (name, value) => {
        setformData({
            ...formData,
            [name]: value,
        });
    };

    const validateInput = (name, value) => {
        let error = "";

        if (name === "customerEmail") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value || !emailRegex.test(value)) {
                error = "Enter a valid email address";
            }
        }

        setFormError((prevError) => ({
            ...prevError,
            [name]: error,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData)

        // Validate email
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.customerEmail.trim()) {
            setFormError(prevError => ({
                ...prevError,
                customerEmail : "This field is required",
            }))
        } 
        else if(!emailRegex.test(formData.customerEmail)) {
            setFormError(prevError => ({
                ...prevError,
                customerEmail : "Enter a valid email address",
            }))
        }
        else{
            console.log(formData)
            try {
                const response = await axios.post("http://localhost:9999/customer/findEmail", formData, { withCredentials: true });
                if (response.status === 200 && response.data === "EMAIL_FOUND") {
                    navigator(`/otp/reset_password?customerEmail=${encodeURIComponent(formData.customerEmail)}`);
                }
            } catch (error) {
                console.log(error);
                if (error.response && error.response.status === 404 && error.response.data === "EMAIL_NOT_FOUND") {
                    toast.error('Please enter the email address used during registration.');
                } else {
                    toast.error('Something went wrong. Please try again.');
                }
            }
            
        }

        // // If there are no errors, show success message
        // if (!inputError.email) {
        //     setformData((prevState) => ({
        //         ...prevState,
        //         successMsg: "Validation Success",
        //     }));
        // } else {
        //     setformData((prevState) => ({
        //         ...prevState,
        //         successMsg: "",
        //     }));
        // }

        // setFormError(inputError);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Request OTP</h2>
                <p className="text-sm text-gray-600 mb-8">
                Please enter the email address used during registration.<br/>
                A One-Time Password (OTP) will be sent to this email address.
                </p>
                <form>
                    <label className="block text-sm font-medium text-gray-600 mt-3">Email</label>
                    <input
                        value={formData.customerEmail}
                        onChange={({ target }) => handleUserInput(target.name, target.value)}
                        onBlur={({ target }) => validateInput(target.name, target.value)}
                        name="customerEmail"
                        type="text"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Enter email"
                    />
                    <p className="text-xs text-red-500 mt-1">{formError.customerEmail}</p>

                    <button
                        type="submit"
                        className="w-full mt-6 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                        onClick={handleSubmit}
                    >
                        Request OTP
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EmailPage;
