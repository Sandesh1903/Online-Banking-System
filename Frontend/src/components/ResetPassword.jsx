import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const navigator = useNavigate()
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const customerEmail = queryParams.get('customerEmail'); 
        const [formData, setformData] = useState({
        password: "",
        confirmPassword: "",
    });

    const [formError, setFormError] = useState({
        password: "",
        confirmPassword: "",
    });

    const handleUserInput = (name, value) => {
        setformData({
            ...formData,
            [name]: value,
        });
    };

    const validateInput = (name, value) => {
        let error = "";

        if (name === "password") {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!value) {
                error = "Password should not be empty";
            } else if (!passwordRegex.test(value)) {
                error =
                    "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character";
            }
        }

        if (name === "confirmPassword") {
            if (!value) {
                error = "Confirm password should not be empty";
            }
            else if (value !== formData.password) {
                error = "Password and confirm password should match";
            }
        }

        setFormError((prevError) => ({
            ...prevError,
            [name]: error,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate password
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!formData.password) {
            setFormError(prevError => ({
                ...prevError,
                password : "Password should not be empty",
            }))
            
        } else if (!passwordRegex.test(formData.password)) {
            setFormError(prevError => ({
                ...prevError,
                password : "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            }))
            
        }

        // Validate confirm password
        if(!formData.confirmPassword){
            setFormError(prevError => ({
                ...prevError,
                confirmPassword : "Confirm password should not be empty",
            }))
        }
        else if (formData.password && formData.confirmPassword !== formData.password) {
            setFormError(prevError => ({
                ...prevError,
                confirmPassword : "Password and confirm password should match",
            }))
            
        }else{
            try {
                const response = await axios.post("http://localhost:9999/customer/resetPassword",
                        {
                            customerEmail : customerEmail,
                            customerPassword : formData.confirmPassword
                        },
                        { withCredentials: true })
    
                console.log(response)
                if(response.status == 200 && response.data == "UPDATED"){
                    toast.success('Password reset successfull..!')
                    navigator("/")
                }
            } catch (error) {
                if(error.status == 404 || error){
                    toast.error('Something went wrong please try again..!')
                }
            }
        }

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Reset Password</h2>
                <form>

                    <label className="block text-sm font-medium text-gray-700 mt-3">Password</label>
                    <input
                        value={formData.password}
                        onChange={({ target }) => handleUserInput(target.name, target.value)}
                        onBlur={({ target }) => validateInput(target.name, target.value)}
                        name="password"
                        type="password"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Enter Password"
                    />
                    <p className="text-xs text-red-500 mt-1">{formError.password}</p>

                    <label className="block text-sm font-medium text-gray-700 mt-3">Confirm Password</label>
                    <input
                        value={formData.confirmPassword}
                        onChange={({ target }) => handleUserInput(target.name, target.value)}
                        onBlur={({ target }) => validateInput(target.name, target.value)}
                        name="confirmPassword"
                        type="password"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Enter Confirm Password"
                    />
                    <p className="text-xs text-red-500 mt-1">{formError.confirmPassword}</p>

                    <button
                        type="submit"
                        className="w-full mt-6 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
