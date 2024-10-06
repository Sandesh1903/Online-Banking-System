import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PaymentTransfer = () => {
  const params = useParams()
  const [accounts, setAccounts] = useState([])
  const [sourceBank, setSourceBank] = useState("");
  const [transferNote, setTransferNote] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({}); 

  const validateField = (name, value) => {
    let validationErrors = { ...errors };

    switch (name) {
      case "sourceBank":
        if (!value) {
          validationErrors.sourceBank = "Please select a source bank.";
        } else {
          delete validationErrors.sourceBank;
        }
        break;
      case "recipientEmail":
        if (!value) {
          validationErrors.recipientEmail = "Recipient's email is required.";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          validationErrors.recipientEmail = "Please enter a valid email address.";
        } else {
          delete validationErrors.recipientEmail;
        }
        break;
      case "accountNumber":
        if (!value) {
          validationErrors.accountNumber = "Recipient's account number is required.";
        } else {
          delete validationErrors.accountNumber;
        }
        break;
      case "amount":
        if (!value) {
          validationErrors.amount = "Please enter an amount.";
        } else if (Number(value) < 1000) {
          validationErrors.amount = "Minimum amount should be thousand.";
        } else {
          delete validationErrors.amount;
        }
        break;
      default:
        break;
    }

    setErrors(validationErrors);
  };

  const validate = () => {
    validateField("sourceBank", sourceBank);
    validateField("recipientEmail", recipientEmail);
    validateField("accountNumber", accountNumber);
    validateField("amount", amount);

    return Object.keys(errors).length === 0;
  };

  const handleBlur = (e) => {
    setTouched((prevTouched) => ({ ...prevTouched, [e.target.name]: true }));
    validateField(e.target.name, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      sourceBank: true,
      recipientEmail: true,
      accountNumber: true,
      amount: true
    });

    if (validate()) {
      console.log("Form is valid! Ready to submit.");
      // Add your submission logic here
    } else {
      console.log("Form has errors.");
    }
  };

  const getAllAccounts = async () => {
    try {
      const response = await axios.get(`http://localhost:9999/account/getAccounts/${params.customerId}`)
      console.log(response.data)
      setAccounts(()=>response.data)
    } catch (error) {
      console.log("error")
      console.log(error)
    }
  }

  useEffect(()=>{
    getAllAccounts()
  },[])

  return (
    <div className="bg-gray-100 w-full h-full">
      <div className="p-6 bg-white shadow-md rounded-lg max-full max-w-full h-screen">
        <h2 className="text-3xl font-semibold mb-2">Payment Transfer</h2>
        <p className="text-gray-600 mb-6">
          Please provide any specific details or notes related to the payment transfer.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Transfer details</h2>
        <p className="text-gray-600 mb-4 border-b border-gray-200 pb-6">
          Enter the details of the recipient.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="flex items-start max-w-[85%] border-b border-gray-200 pb-6">
              <label className="w-1/3 text-gray-700">
                Select Source Bank
                <p className="text-sm text-gray-500">
                  Select the bank account you want to transfer funds from
                </p>
              </label>
              <div className="w-2/3">
                <select
                  name="sourceBank"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 ${errors.sourceBank ? 'border-red-500' : ''}`}
                  value={sourceBank}
                  onChange={(e) => setSourceBank(e.target.value)}
                  onBlur={handleBlur}
                >
                  <option value="" disabled>
                    Select Account
                  </option>
                  {
                  accounts.filter(element => element.accountType === "savings" || element.accountType === "current").map((element,index)=>{
                    return <option value={element.accountId}>{element.accountType + " account-" + element.accountId}</option>
                  })
                }
                  {/* Add more banks as options */}
                </select>
                {errors.sourceBank && <p className="text-red-500 text-sm text-left">{errors.sourceBank}</p>}
              </div>
            </div>

            <div className="flex items-start max-w-[85%] border-b border-gray-200 pb-6">
              <label className="w-1/3 text-gray-700">
                Transfer Note (Optional)
                <p className="text-sm text-gray-500">
                  Please provide any additional information or instructions related to the transfer
                </p>
              </label>
              <div className="w-2/3">
                <textarea
                  name="transferNote"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  rows="4"
                  placeholder="Enter your transfer note here"
                  value={transferNote}
                  onChange={(e) => setTransferNote(e.target.value)}
                />
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-2">Bank account details</h2>
            <p className="text-gray-600 mb-4">
              Enter bank account details of recipient
            </p>

            <div className="flex items-start max-w-[85%] border-b border-gray-200 pb-6">
              <label className="w-1/3 text-gray-700">Recipient's Email Address</label>
              <div className="w-2/3">
                <input
                  name="recipientEmail"
                  type="email"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 ${errors.recipientEmail ? 'border-red-500' : ''}`}
                  placeholder="Enter the email address"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  onBlur={handleBlur}
                />
                {errors.recipientEmail && <p className="text-red-500 text-sm text-left">{errors.recipientEmail}</p>}
              </div>
            </div>

            <div className="flex items-start max-w-[85%] border-b border-gray-200 pb-6">
              <label className="w-1/3 text-gray-700">Recipient's Bank Account Number</label>
              <div className="w-2/3">
                <input
                  name="accountNumber"
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 ${errors.accountNumber ? 'border-red-500' : ''}`}
                  placeholder="Enter the account number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  onBlur={handleBlur}
                />
                {errors.accountNumber && <p className="text-red-500 text-sm text-left">{errors.accountNumber}</p>}
              </div>
            </div>

            <div className="flex items-start max-w-[85%] border-b border-gray-200 pb-6">
              <label className="w-1/3 text-gray-700">Amount</label>
              <div className="w-2/3">
                <input
                  name="amount"
                  type="number"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 ${errors.amount ? 'border-red-500' : ''}`}
                  placeholder="Enter the amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  onBlur={handleBlur}
                />
                {errors.amount && <p className="text-red-500 text-sm text-left">{errors.amount}</p>}
              </div>
            </div>
          </div>

          <div className="text-right mt-6 max-w-[85%]">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200 w-full"
            >
              Transfer Funds
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentTransfer;

