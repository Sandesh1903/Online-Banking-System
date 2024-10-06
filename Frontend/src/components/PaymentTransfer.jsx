import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentTransfer = () => {
  const navigator = useNavigate();
  const params = useParams();
  const [accounts, setAccounts] = useState([]);
  const [sourceBank, setSourceBank] = useState(null);
  const [sourceBankDetails, setSourceBankDetails] = useState(""); // State for source bank details
  const [destinationBank, setDestinationBank] = useState(null);
  const [transferNote, setTransferNote] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [transferType, setTransferType] = useState("other"); // For radio button state
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  console.log(params);

  const formatDateToYYYYMMDD = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

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
      case "destinationBank":
        if (transferType === "self" && !value) {
          validationErrors.destinationBank = "Please select a destination bank.";
        } else {
          delete validationErrors.destinationBank;
        }
        break;
      case "recipientEmail":
        if (transferType === "other" && !value) {
          validationErrors.recipientEmail = "Recipient's email is required.";
        } else if (transferType === "other" && !/\S+@\S+\.\S+/.test(value)) {
          validationErrors.recipientEmail = "Please enter a valid email address.";
        } else {
          delete validationErrors.recipientEmail;
        }
        break;
      case "accountNumber":
        if (transferType === "other" && !value) {
          validationErrors.accountNumber = "Recipient's account number is required.";
        } else {
          delete validationErrors.accountNumber;
        }
        break;
      case "amount":
        if (!value) {
          validationErrors.amount = "Please enter an amount.";
        } else if (Number(value) < 1) {
          validationErrors.amount = "Minimum amount should be 1.";
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
    let validationErrors = {};

    if (!sourceBank) {
      validationErrors.sourceBank = "Please select a source bank.";
    }

    if (transferType === "self" && !destinationBank) {
      validationErrors.destinationBank = "Please select a destination bank.";
    }

    if (transferType === "other") {
      if (!recipientEmail) {
        validationErrors.recipientEmail = "Recipient's email is required.";
      } else if (!/\S+@\S+\.\S+/.test(recipientEmail)) {
        validationErrors.recipientEmail = "Please enter a valid email address.";
      }

      if (!accountNumber) {
        validationErrors.accountNumber = "Recipient's account number is required.";
      }
    }

    if (!amount) {
      validationErrors.amount = "Please enter an amount.";
    } else if (amount <= 0) {
      validationErrors.amount = "Amount must be greater than zero.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleBlur = (e) => {
    setTouched((prevTouched) => ({ ...prevTouched, [e.target.name]: true }));
    validateField(e.target.name, e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = formatDateToYYYYMMDD(new Date());

    const data = {
      sender: {
        accountId: sourceBank,
        transactionType: "debit",
        transactionAmount: amount,
        transactionDate: formattedDate,
        transferNote: transferNote
      },
      recipient: transferType === "other"
        ? {
          accountId: accountNumber,
          transactionType: "credit",
          transactionAmount: amount,
          transactionDate: formattedDate,
          transferNote: transferNote
        }
        : {
          accountId: destinationBank,
          transactionType: "credit",
          transactionAmount: amount,
          transactionDate: formattedDate,
          transferNote: transferNote
        }
    };

    if (validate()) {
      console.log(data);
      try {
        const response = await axios.post("http://localhost:9999/transaction/paymentTransfer", data, { withCredentials: true });
        console.log(response);
        if (response.status === 200 && response.data === "SUCCESS") {
          toast.success('Funds transferred successfully..!');
          navigator("/dashboard");
        }
      } catch (error) {
        console.log("error");
        console.log(error);
        if (error.status === 400 && error.response.data === "NOT_ACCEPTED") {
          toast.error('Cannot transfer funds to this account');
        } else if (error.status === 400 && error.response.data === "INSUFFICIENT_BALANCE") {
          toast.error('Insufficient account balance..!');
        } else {
          toast.error('Something went wrong');
        }
      }
    } else {
      console.log("Form has errors.");
    }
  };

  const getAllAccounts = async () => {
    try {
      const response = await axios.get(`http://localhost:9999/account/getAccounts/${params.customerId}`, { withCredentials: true });
      console.log(response.data);
      setAccounts(() => response.data);
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  useEffect(() => {
    getAllAccounts();
  }, []);

  useEffect(() => {
    if (sourceBank) {
      const selectedAccount = accounts.find(account => account.accountId === sourceBank);
      if (selectedAccount) {
        setSourceBankDetails(selectedAccount.accountBalance); // Assuming you want to display account balance
      }
    }
  }, [sourceBank, accounts]);

  // Filtered destination accounts, excluding the selected source bank
  const filteredDestinationAccounts = accounts.filter(
    (account) => account.accountId !== sourceBank
  );

  return (
    <div className="bg-gray-100 w-full h-full">
      <div className="p-6 bg-white rounded-lg max-full max-w-full h-screen">
        <h2 className="text-3xl font-semibold mb-2">Payment Transfer</h2>
        <p className="text-gray-600 mb-6">
          Please provide any specific details or notes related to the payment transfer.
        </p>

        {/* Transfer Type Radio Buttons */}
        <div className="mb-4">
          <label className="mr-4">
            <input
              type="radio"
              name="transferType"
              value="self"
              checked={transferType === "self"}
              onChange={(e) => setTransferType(e.target.value)}
              className="mr-2"
            />
            Self Transfer
          </label>
          <label>
            <input
              type="radio"
              name="transferType"
              value="other"
              checked={transferType === "other"}
              onChange={(e) => setTransferType(e.target.value)}
              className="mr-2"
            />
            Other Accounts
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="flex items-start max-w-[85%] border-b border-gray-200 pb-6">
              <label className="w-1/3 text-gray-700">
                Select Source Bank
                <p className="text-sm text-gray-500">
                  Select the bank account you want to transfer funds from
                </p>
              </label>
              <div className="w-2/3 flex items-center">
                <select
                  name="sourceBank"
                  className={`w-2/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 ${errors.sourceBank ? 'border-red-500' : ''}`}
                  value={sourceBank}
                  onChange={(e) => setSourceBank(e.target.value)}
                  onBlur={handleBlur}
                >
                  <option value="">
                    Select Account
                  </option>
                  {accounts
                    .filter(element => element.accountType === "savings" || element.accountType === "current")
                    .map((element, index) => (
                      <option key={index} value={element.accountId}>{element.accountType + " account-" + element.accountId + ": Account balance - " + element.accountBalance}</option>
                    ))}
                </select>
                <input
                  type="text"
                  value={sourceBankDetails}
                  placeholder="Account Balance"
                  readOnly
                  className="ml-4 w-1/3 px-4 py-2 border rounded-lg bg-gray-200 text-gray-600"
                />
              </div>
            </div>

            {/* Destination Bank Dropdown (Visible when Self Transfer is selected) */}
            {transferType === "self" && (
              <div className="flex items-start max-w-[85%] border-b border-gray-200 pb-6">
                <label className="w-1/3 text-gray-700">
                  Select Destination Bank
                  <p className="text-sm text-gray-500">
                    Select the bank account you want to transfer funds to
                  </p>
                </label>
                <div className="w-2/3">
                  <select
                    name="destinationBank"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 ${errors.destinationBank ? 'border-red-500' : ''}`}
                    value={destinationBank}
                    onChange={(e) => setDestinationBank(e.target.value)}
                    onBlur={handleBlur}
                  >
                    <option value="">
                      Select Account
                    </option>
                    {filteredDestinationAccounts
                      .filter(element => element.accountType === "savings" || element.accountType === "current")
                      .map((element, index) => (
                        <option key={index} value={element.accountId}>{element.accountType + " account-" + element.accountId + ": Account balance - " + element.accountBalance}</option>
                      ))}
                  </select>
                  {errors.destinationBank && <p className="text-red-500 text-sm text-left">{errors.destinationBank}</p>}
                </div>
              </div>
            )}

            {transferType === "other" && (
              <>
                <div className="flex items-start max-w-[85%] border-b border-gray-200 pb-6">
                  <label className="w-1/3 text-gray-700">
                    Recipient Email
                    <p className="text-sm text-gray-500">
                      Provide the recipient's registered email
                    </p>
                  </label>
                  <div className="w-2/3">
                    <input
                      name="recipientEmail"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 ${errors.recipientEmail ? 'border-red-500' : ''}`}
                    />
                    {errors.recipientEmail && <p className="text-red-500 text-sm text-left">{errors.recipientEmail}</p>}
                  </div>
                </div>

                <div className="flex items-start max-w-[85%] border-b border-gray-200 pb-6">
                  <label className="w-1/3 text-gray-700">
                    Recipient Account Number
                    <p className="text-sm text-gray-500">
                      Provide the recipient's account number
                    </p>
                  </label>
                  <div className="w-2/3">
                    <input
                      name="accountNumber"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 ${errors.accountNumber ? 'border-red-500' : ''}`}
                    />
                    {errors.accountNumber && <p className="text-red-500 text-sm text-left">{errors.accountNumber}</p>}
                  </div>
                </div>
              </>
            )}

            <div className="flex items-start max-w-[85%] border-b border-gray-200 pb-6">
              <label className="w-1/3 text-gray-700">
                Amount
                <p className="text-sm text-gray-500">
                  Enter the amount to be transferred
                </p>
              </label>
              <div className="w-2/3">
                <input
                  name="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 ${errors.amount ? 'border-red-500' : ''}`}
                />
                {errors.amount && <p className="text-red-500 text-sm text-left">{errors.amount}</p>}
              </div>
            </div>

            <div className="flex items-start max-w-[85%] border-b border-gray-200 pb-6">
              <label className="w-1/3 text-gray-700">
                Transfer Note
                <p className="text-sm text-gray-500">
                  Add any optional note for this transaction
                </p>
              </label>
              <div className="w-2/3">
                <input
                  name="transferNote"
                  value={transferNote}
                  onChange={(e) => setTransferNote(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
            </div>
          </div>

          <button type="submit" className="mt-6 px-5 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            Transfer Funds
          </button>
          <Link to="/dashboard" className="mt-6 px-5 bg-slate-200 py-2 rounded-lg hover:bg-slate-300 ml-3">
            Close
          </Link>
        </form>
      </div>
    </div>
  );
};

export default PaymentTransfer;