import React, { useEffect, useState } from 'react';
import register from '../assets/images/Register.png';
import axios from 'axios';
import formRules from '../formRules';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BiLoaderCircle } from 'react-icons/bi';
const Registration = () => {
  const navigator = useNavigate();
  const [formData, setFormData] = useState({
    customerFirstName: "",
    customerLastName: "",
    customerDateOfBirth: "",
    customerPANCardNumber: "",
    customerAadharCardNumber: "",
    customerGender: "",
    customerEmail: "",
    customerMobileNo: "",
    customerAddress: "",
    customerRegistrationDate: "",
    accountType: ""
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);

  const formatDateToYYYYMMDD = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target
    let error = formRules.registrationFormOnBlurRules(e);
    console.log(error)

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format the customerRegistrationDate to YYYYMMDD
    const formattedDate = formatDateToYYYYMMDD(new Date());

    // Create a copy of formData with the updated registration date
    const updatedFormData = {
      ...formData,
      customerRegistrationDate: formattedDate,
    };

    const newErrors = {};

    // Basic required field validations
    if (!updatedFormData.customerFirstName) newErrors.customerFirstName = 'This field is required';
    if (!updatedFormData.customerLastName) newErrors.customerLastName = 'This field is required';
    if (!updatedFormData.customerDateOfBirth) newErrors.customerDateOfBirth = 'This field is required';
    if (!updatedFormData.customerPANCardNumber) newErrors.customerPANCardNumber = 'This field is required';
    if (!updatedFormData.customerAadharCardNumber) newErrors.customerAadharCardNumber = 'This field is required';
    if (!updatedFormData.customerGender) newErrors.customerGender = 'This field is required';
    if (!updatedFormData.customerEmail) newErrors.customerEmail = 'This field is required';
    if (!updatedFormData.customerMobileNo) newErrors.customerMobileNo = 'This field is required';
    if (!updatedFormData.customerAddress) newErrors.customerAddress = 'This field is required';
    if (!updatedFormData.accountType) newErrors.accountType = 'This field is required';

    // Additional validations using form rules
    if (updatedFormData.customerEmail && !formRules.email(updatedFormData.customerEmail)) {
      newErrors.customerEmail = 'Invalid email address. Must be a @gmail.com email.';
    }
    if (updatedFormData.customerDateOfBirth && !formRules.age(updatedFormData.customerDateOfBirth)) {
      newErrors.customerDateOfBirth = 'Age must be above 18.';
    }
    if (updatedFormData.customerMobileNo && !formRules.mobileNo(updatedFormData.customerMobileNo)) {
      newErrors.customerMobileNo = 'Mobile number must be 10 digits.';
    }
    if (updatedFormData.customerPANCardNumber && !formRules.panCardNumber(updatedFormData.customerPANCardNumber)) {
      newErrors.customerPANCardNumber = 'Invalid PAN Card Number.';
    }
    if (updatedFormData.customerAadharCardNumber && !formRules.aadharCardNumber(updatedFormData.customerAadharCardNumber)) {
      newErrors.customerAadharCardNumber = 'Aadhar Card Number must be 12 digits.';
    }

    // If there are errors, update the error state and return early
    if (Object.keys(newErrors).length > 0) {
      console.log('newErrors', newErrors);
      setErrors(newErrors);
      return;
    }

    try {
      // Async request to register the customer
      console.log(updatedFormData);
      setLoading(true);
      const response = await axios.post('http://localhost:9999/customer/register', updatedFormData);
      console.log(response);
      setLoading(false);
      if (response.data == "CREATED" && response.status == 200) {
        toast.success(`Registration successfull....!`)
        toast.info(`${formData.accountType} account is created`);
        navigator("/message");
      }
      // Clear form data or handle successful registration
    } catch (error) {
      setLoading(false);
      let status = error.response.status
      let data = error.response.data
      console.log(error.response.status)
      console.log(error.response.data)
      if (status == 409 && data == "EXISTS") {
        toast.warning(`Already had an account with ${formData.customerEmail}`)
      }
      else if (status == 401) {
        toast.error(`Registration failed..`)
      }
    }
  };



  return (
    <div className="bg-white flex justify-around">
      <div className="w-1/2 p-5">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Sign up</h2>
        <p className="text-sm text-gray-600 text-center mb-8">
          Please enter your details.
        </p>
        <form className='w-[80%] mx-auto'>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                id="firstName"
                name="customerFirstName"
                placeholder="Enter your first name"
                value={formData.customerFirstName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.customerFirstName && (
                <p className="text-red-500 text-sm mt-1">{errors.customerFirstName}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="customerLastName"
                placeholder="Enter your last name"
                value={formData.customerLastName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.customerLastName && (
                <p className="text-red-500 text-sm mt-1">{errors.customerLastName}</p>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="customerDateOfBirth"
              value={formData.customerDateOfBirth}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.customerDateOfBirth && (
              <p className="text-red-500 text-sm mt-1">{errors.customerDateOfBirth}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="panCardNumber" className="block text-sm font-medium text-gray-700">PAN Card Number</label>
            <input
              type="text"
              id="panCardNumber"
              name="customerPANCardNumber"
              placeholder="Enter your PAN Card Number"
              value={formData.customerPANCardNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.customerPANCardNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.customerPANCardNumber}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="aadharCardNumber" className="block text-sm font-medium text-gray-700">Aadhar Card Number</label>
            <input
              type="text"
              id="aadharCardNumber"
              name="customerAadharCardNumber"
              placeholder="Enter your Aadhar Card Number"
              value={formData.customerAadharCardNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.customerAadharCardNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.customerAadharCardNumber}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="customerGender" className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              id="customerGender"
              name="customerGender"
              value={formData.customerGender}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.customerGender && (
              <p className="text-red-500 text-sm mt-1">{errors.customerGender}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="customerEmail"
              name="customerEmail"
              placeholder="Enter your email"
              value={formData.customerEmail}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.customerEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.customerEmail}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="customerMobileNo" className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <input
              type="tel"
              id="customerMobileNo"
              name="customerMobileNo"
              placeholder="Enter your mobile number"
              value={formData.customerMobileNo}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.customerMobileNo && (
              <p className="text-red-500 text-sm mt-1">{errors.customerMobileNo}</p>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="customerAddress" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              id="customerAddress"
              name="customerAddress"
              placeholder="Enter your address"
              value={formData.customerAddress}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.customerAddress && (
              <p className="text-red-500 text-sm mt-1">{errors.customerAddress}</p>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="accountType" className="block text-sm font-medium text-gray-700">Account Type</label>
            <select
              id="accountType"
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Account Type</option>
              <option value="savings">Saving</option>
              <option value="current">Current</option>
              <option value="fixed_deposit">Fixed Deposit</option>
            </select>
            {errors.accountType && (
              <p className="text-red-500 text-sm mt-1">{errors.accountType}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`${isLoading && 'cursor-not-allowed'} group relative w-full flex justify-center items-center gap-3 py-2 px-4 border transition hover:scale-[1.01] duration-300 border-transparent font-medium rounded-md text-white bg-darkBulish hover:bg-mediumBluish focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            onClick={handleSubmit}
          >
            Sign Up {isLoading && <BiLoaderCircle size={20} className='text-white animate-fade-in animate-fade-spin' />}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">Already have an account? <a href="" className="text-blue-500 hover:underline" onClick={() => { navigator("/") }}>Login</a></p>
      </div>
      <div className="w-1/2 bg-contain bg-no-repeat" style={{ backgroundImage: `url('${register}')` }}></div>
    </div>
  );
};

export default Registration;
