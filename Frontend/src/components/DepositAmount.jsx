import axios from 'axios';
import React, { useEffect, useState } from 'react';

const DepositAmount = () => {
  const [accountId, setaccountId] = useState('');
  const [accountType, setAccountType] = useState('');
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';

    if (name === 'accountId') {
      if (!value.trim()) {
        error = 'Account Id is required';
      }
    }

    if (name === 'accountType') {
      if (!value) {
        error = 'Account Type is required';
      }
    }

    if (name === 'amount') {
      if (!value.trim()) {
        error = 'Amount is required';
      } else if (isNaN(value) || value < 1000) {
        error = 'Amount must be a number and at least 1000';
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      // Submit form logic here
      console.log('Form submitted');
    }
  };

  const validate = () => {
    validateField('accountId', accountId);
    validateField('accountType', accountType);
    validateField('amount', amount);

    return Object.keys(errors).length === 0;
  };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Deposit Amount</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mt-3">Account Id</label>
            <input
              type="text"
              name="accountId"
              placeholder="Account Id"
              value={accountId}
              onChange={(e) => setaccountId(e.target.value)}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.accountId ? 'border-red-500' : 'focus:ring-blue-500'
              }`}
            />
            {errors.accountId && (
              <p className="text-red-500 text-sm mt-1">{errors.accountId}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mt-3">Select Account Type</label>
            <select
              name="accountType"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.accountType ? 'border-red-500' : 'focus:ring-blue-500'
              }`}
            >
              <option value="">Select Account Type</option>
              <option value="Savings">Savings</option>
              <option value="Current">Current</option>
            </select>
            {errors.accountType && (
              <p className="text-red-500 text-sm mt-1">{errors.accountType}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mt-3">Amount</label>
            <input
              type="text"
              name="amount"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.amount ? 'border-red-500' : 'focus:ring-blue-500'
              }`}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default DepositAmount;
