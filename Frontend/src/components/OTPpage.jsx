import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const OTPPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const customerEmail = queryParams.get('customerEmail');
    const params = useParams()
    console.log(params)
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [formError, setFormError] = useState("");
    const [isLoading, setLoading] = useState(false);

    const inputRefs = useRef([]);
    const navigator = useNavigate();

    // Handles change for each OTP input
    const handleOtpChange = (index, value) => {
        if (value.length > 1) return; // Prevents more than one character
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Focus on the next input field if the current one is filled
        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    // Handles the backspace key to focus on the previous input
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const newOtp = [...otp];
            newOtp[index - 1] = "";
            setOtp(newOtp);
            inputRefs.current[index - 1].focus();
        }
    };

    // Validates OTP input
    const validateOtp = () => {
        if (otp.some((digit) => digit === "")) {
            setFormError("Please enter all 6 digits of the OTP.");
        } else {
            setFormError("");
            return "VALID"
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let status = validateOtp();
        if (status == "VALID") {
            console.log(otp.join(""))
            try {
                setLoading(true);
                const response = await axios.post(
                    "http://localhost:9999/customer/verifyOtp",
                    { otp: otp.join("") },
                    { withCredentials: true }
                );
                console.log("success")
                console.log(response)
                setLoading(false);
                if (params.navigateTo == "dashboard") {
                    toast.success("Login Successful!!");
                    navigator(`/${params.navigateTo}`)
                }
                else if (params.navigateTo == "reset_password") {
                    navigator(`/${params.navigateTo}?customerEmail=${encodeURIComponent(customerEmail)}`)
                }

            } catch (error) {
                setLoading(false);
                console.log("error")
                console.log(error)
            }
        }
    };

    // Focus on the first input box when the page loads
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    return (
        <div className="bg-gray-100 flex justify-center items-center min-h-screen">
            <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Verify OTP</h2>
                <p className="text-sm text-gray-600 text-center mb-8">
                    A One-Time Password (OTP) has been sent to your email. Please enter the OTP below to verify your account.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex justify-center space-x-2">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                id={`otp-input-${index}`}
                                type="text"
                                value={digit}
                                onChange={({ target }) => handleOtpChange(index, target.value)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="w-10 h-10 border border-gray-300 rounded-lg text-center text-xl focus:ring-blue-500 focus:border-blue-500"
                                maxLength="1"
                            />
                        ))}
                    </div>
                    {formError && <p className="text-xs text-red-500 text-center">{formError}</p>}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`${isLoading && 'cursor-not-allowed'} group relative w-full flex justify-center items-center gap-3 py-2 px-4 border transition hover:scale-[1.01] duration-300 border-transparent font-medium rounded-md text-white bg-darkBulish hover:bg-mediumBluish focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}                    >
                        Verify OTP {isLoading && <BiLoaderCircle className='text-white animate-fade-in animate-fade-spin' />}
                    </button>

                    <p className="text-sm text-center text-gray-600 mt-4">
                        Didn't receive the OTP? <a href="#" onClick={() => alert('Resending OTP...')} className="text-indigo-600 hover:underline">Resend OTP</a>
                    </p>
                </form>
            </div>
        </div >
    );

}

export default OTPPage;