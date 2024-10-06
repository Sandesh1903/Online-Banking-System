import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddAccount = () => {
    const navigator = useNavigate();
    const { customerId } = useParams();
    useEffect(() => {
        if (document.cookie.split('=')[0] != "JSESSIONID") {
            toast.error("Unauthorized! Please Login.");
            navigator("/");
        }
    }, []);

    const [accountType, setAccountType] = useState("");
    const [showInterestRates, setShowInterestRates] = useState(false);
    const [showTenureField, setShowTenureField] = useState(false);
    const [showAcccountId, setShowAccountId] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    const [accountId, setAccountId] = useState("");
    const [accountBalance, setAccountBalance] = useState(null)
    const [accounts, setAccounts] = useState([]);

    const formatDateToYYYYMMDD = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // State to handle input values
    const [formValues, setFormValues] = useState({
        customerId: customerId,
        amount: 0,
        tenure: 0,
    });

    // State to handle error messages
    const [errors, setErrors] = useState({
        customerId: "",
        accountType: "",
        amount: "",
        tenure: "",
        accountId : ""
    });

    const getAllAccounts = async () => {
        try {
          const response = await axios.get(`http://localhost:9999/account/getAccounts/${customerId}`, { withCredentials: true });
          console.log(response.data);
          setAccounts(() => response.data);
        } catch (error) {
          console.log("error");
          console.log(error);
        }
      };

      useEffect(()=>{
        getAllAccounts();
      },[])

    const handleAccountTypeChange = (event) => {
        const selectedType = event.target.value;
        setAccountType(selectedType);

        // Show Interest Rates link and tenure field based on account type
        if (selectedType === "fixed_deposit" || selectedType === "recurring _deposit") {
            setShowInterestRates(true);
            setShowTenureField(true);
            setShowAccountId(true);
        } else {
            setShowInterestRates(false);
            setShowTenureField(false);
            setShowAccountId(false);
        }
    };

    const handleBlur = (field, value) => {
        let errorMessage = "";
    
        // Check for empty fields
        if (!value) {
            errorMessage = `${field} is required.`;
        } else if (field === "customerId" && !/^\d{7,}$/.test(value)) {
            errorMessage = "Customer Id must contain at least 7 digits.";
        } else if (field === "amount") {
            const amount = parseFloat(value);
            if (accountType === "fixed_deposit" && amount < 500) {
                errorMessage = "Minimum amount for Fixed Deposit is 500.";
            } else if (accountType === "recurring _deposit" && amount < 500) {
                errorMessage = "Minimum amount for Recurring Deposit is 500.";
            } else if ((accountType === "current" || accountType === "savings") && amount < 2000) {
                errorMessage = "Minimum amount for Savings or Current Account is 2000.";
            }
        } else if (field === "tenure" && value < 12) {
            errorMessage = "Tenure must be greater than or equal to 12 months.";
        } else if (field === "accountId" && !/^\d+$/.test(value)) {
            // Add accountId validation here
            errorMessage = "Account Id must be a valid number.";
        }
    
        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: errorMessage,
        }));
    };
    
    const handleChange = (field, value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [field]: value,
        }));
    };

    const validateFields = () => {
        const newErrors = {
            customerId: "",
            accountType: "",
            amount: "",
            tenure: "",
            accountId: ""
        };

        // Validate Customer ID
        if (!formValues.customerId) {
            newErrors.customerId = "Customer Id is required.";
        } else if (!/^\d{7,}$/.test(formValues.customerId)) {
            newErrors.customerId = "Customer Id must contain at least 7 digits.";
        }

        // Validate Account Type
        if (!accountType) newErrors.accountType = "Account Type is required.";

        // Validate Amount
        const amount = parseFloat(formValues.amount);
        if (!formValues.amount) {
            newErrors.amount = "Amount is required.";
        } else if (isNaN(amount)) {
            newErrors.amount = "Amount must be a number.";
        } else if (accountType === "fixed_deposit" && amount < 500) {
            newErrors.amount = "Minimum amount for Fixed Deposit is 500.";
        } else if (accountType === "recurring _deposit" && amount < 500) {
            newErrors.amount = "Minimum amount for Recurring Deposit is 500.";
        } else if ((accountType === "current" || accountType === "savings") && amount < 2000) {
            newErrors.amount = "Minimum amount for Savings or Current Account is 2000.";
        }

        // Validate Tenure
        if (showTenureField) {
            const tenure = parseInt(formValues.tenure, 10);
            if (!formValues.tenure) {
                newErrors.tenure = "Tenure is required.";
            } else if (isNaN(tenure)) {
                newErrors.tenure = "Tenure must be a number.";
            } else if (tenure < 12) {
                newErrors.tenure = "Tenure must be greater than or equal 12 months.";
            }
        }
        if (showAcccountId) {
            if(accountId == ""){
                newErrors.accountId = "Account Id is required";
            }
        }

        setErrors(newErrors);

        // Return true if no errors
        return !Object.values(newErrors).some((msg) => msg !== "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedDate = formatDateToYYYYMMDD(new Date());

        const calculation = () => {
            let interest = 0;
            let amountToBeCredited = 0;
            if (accountType == "fixed_deposit") {
                if (formValues.tenure >= 12 && formValues.tenure < 24) {
                    interest = 7;
                    amountToBeCredited = (formValues.amount * interest * (formValues.tenure / 12)) / 100;
                } else if (formValues.tenure >= 24 && formValues.tenure < 36) {
                    interest = 7.9;
                    amountToBeCredited = (formValues.amount * interest * (formValues.tenure / 12)) / 100;
                } else if (formValues.tenure >= 36 && formValues.tenure <= 60) {
                    interest = 8.08;
                    amountToBeCredited = (formValues.amount * interest * (formValues.tenure / 12)) / 100;
                } else if (formValues.tenure > 60) {
                    interest = 8.12;
                    amountToBeCredited = (formValues.amount * interest * (formValues.tenure / 12)) / 100;
                }
                amountToBeCredited = parseFloat(amountToBeCredited) + parseFloat(formValues.amount);
            }
            else if (accountType == "recurring _deposit") {
                // Function to calculate RD maturity with compounding interest
                function calculateRDMaturity(principal, interestRate, tenureMonths) {
                    const monthlyInterestRate = interestRate / (12 * 100); // Convert annual rate to monthly rate in decimal
                    const maturityAmount = principal * ((Math.pow(1 + monthlyInterestRate, tenureMonths) - 1) / (1 - Math.pow(1 + monthlyInterestRate, -1)));
                    return maturityAmount;
                }

                // Determine interest rate and calculate maturity amount based on tenure
                if (formValues.tenure >= 12 && formValues.tenure < 24) {
                    interest = 7;
                    amountToBeCredited = calculateRDMaturity(formValues.amount, interest, formValues.tenure);
                } else if (formValues.tenure >= 24 && formValues.tenure < 36) {
                    interest = 7.9;
                    amountToBeCredited = calculateRDMaturity(formValues.amount, interest, formValues.tenure);
                } else if (formValues.tenure >= 36 && formValues.tenure <= 60) {
                    interest = 8.08;
                    amountToBeCredited = calculateRDMaturity(formValues.amount, interest, formValues.tenure);
                } else if (formValues.tenure > 60) {
                    interest = 8.12;
                    amountToBeCredited = calculateRDMaturity(formValues.amount, interest, formValues.tenure);
                }

            }


            return { interest, amountToBeCredited };
        };

        const { interest, amountToBeCredited } = calculation();

        // Validate all fields before submitting
        if (!validateFields()) {
            console.error("Validation failed");
            return;
        }

        console.log("Validated");
        
        const data = {
            accountType: accountType,
            customerId: formValues.customerId,
            accountBalance: formValues.amount,
            accountCreationDate: formattedDate,
            tenure: formValues.tenure,
            interest: interest,
            amountToBeCredited: amountToBeCredited
        }
        console.log(data)
        
        try {
            console.log(data)
            if(parseFloat(formValues.amount) > parseFloat(accountBalance)){
                toast.error('Insufficient Balance..!')
                console.log(accountBalance)
                console.log(formValues.amount)
                console.log(formValues.amount > accountBalance)
                return
            }
            const response = await axios.post("http://localhost:9999/account/createAccount", data, { withCredentials: true })
            console.log(response)
            if (response.status === 200 && response.data.message === "CREATED") {
                if(data.accountType == "fixed_deposit" || data.accountType== "recurring _deposit"){
                const paymentData = {
                    sender: {
                      accountId: accountId,
                      transactionType: "debit",
                      transactionAmount: formValues.amount,
                      transactionDate: formattedDate,
                      transferNote: accountType + " created"
                    },
                    recipient:  {
                        accountId: response.data.accountId,
                        transactionType: "credit",
                        transactionAmount: formValues.amount,
                        transactionDate: formattedDate,
                        transferNote: accountType + " created"
                      }
                  };
                  try {
                    console.log(paymentData)
                    const response = await axios.post("http://localhost:9999/transaction/paymentTransfer", paymentData, { withCredentials: true });
                    console.log(response);
                    if (response.status === 200 && response.data === "SUCCESS") {
                    toast.success('Funds transferred successfully..!');
                    navigator("/dashboard");
                    }
                  } catch (error) {
                    console.log(error)
                        toast.error('Something went wrong please try again..')
                  }
                }
                toast.success("Account created")
                navigator("/dashboard");
            }
        } catch (error) {
            console.log("error")
            console.log(error)
            // if (error.response.status === 404 && error.response.data === "NOT_FOUND") {
            //     toast.error("Customer not found..Please verify Customer Id")
            // }
            // else {
            //     toast.error("Something went wrong..please try again")
            // }
        }
    };


    const toggleModal = () => {
        setIsModalOpen(!isModalOpen); // Toggle modal visibility
    };

    return (
        <div className="bg-gray-100 flex justify-center items-center min-h-screen">
            <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Add Account</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="number"
                            placeholder="Customer Id"
                            value={customerId}
                            readOnly
                            className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed focus:outline-none"
                        // onChange={(e) => handleChange("customerId", e.target.value)}
                        // onBlur={(e) => handleBlur("customerId", e.target.value)}
                        />
                        {errors.customerId && (
                            <p className="text-xs text-red-500">{errors.customerId}</p>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <select
                            value={accountType}
                            onChange={handleAccountTypeChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            onBlur={(e) => handleBlur("accountType", e.target.value)}
                        >
                            <option value="" disabled>
                                Select Account Type
                            </option>
                            <option value="fixed_deposit">Fixed Deposit</option>
                            <option value="recurring _deposit">Recurring Deposit</option>
                            <option value="current">Current Account</option>
                            <option value="savings">Savings Account</option>
                        </select>
                        {showInterestRates && (
                            <button
                                type="button"
                                onClick={toggleModal}
                                className="text-indigo-600 hover:underline"
                            >
                                Interest Rates
                            </button>
                        )}
                    </div>
                    {errors.accountType && (
                        <p className="text-xs text-red-500">{errors.accountType}</p>
                    )}

                    <div>
                        <input
                            type="number"
                            placeholder="Amount"
                            className="w-full p-2 border border-gray-300 rounded"
                            onChange={(e) => handleChange("amount", e.target.value)}
                            onBlur={(e) => handleBlur("amount", e.target.value)}
                        />
                        {errors.amount && (
                            <p className="text-xs text-red-500">{errors.amount}</p>
                        )}
                    </div>

                    {showTenureField && (
                        
                        <div>
                            <input
                                type="number"
                                placeholder="Tenure (In months)"
                                className="w-full p-2 border border-gray-300 rounded"
                                onChange={(e) => handleChange("tenure", e.target.value)}
                                onBlur={(e) => handleBlur("tenure", e.target.value)}
                            />
                            {errors.tenure && (
                                <p className="text-xs text-red-500">{errors.tenure}</p>
                            )}
                        </div>)}
                    { showAcccountId && (
                        <div>
                        <select
                            name="accountId"
                            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 ${errors.sourceBank ? 'border-red-500' : ''}`}
                            // value={accountId}
                            onChange={(e) => {
                                // Set the accountId from the selected option's value
                                setAccountId(e.target.value);
                            
                                // Retrieve the accountBalance from the custom attribute
                                const selectedOption = e.target.options[e.target.selectedIndex];
                                const accountBalance = selectedOption.getAttribute('data-accountbalance');
                            
                                // Set the accountBalance in state
                                setAccountBalance(accountBalance);
                            }}
                            
                            onBlur={(e)=> handleBlur("accountId", e.target.value)}
                            >
                            <option value="">
                                Select Account
                            </option>
                            {accounts
                                .filter(element => element.accountType === "savings" || element.accountType === "current")
                                .map((element, index) => (
                                <option key={index}  data-accountbalance={element.accountBalance} value={element.accountId}>{element.accountType + " account-" + element.accountId + " : Account balance - " + element.accountBalance}</option>
                                ))}
                        </select>
                        {errors.accountId && (
                                <p className="text-xs text-red-500">{errors.accountId}</p>
                            )}
                        </div>
                       
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 transition duration-300"
                    >
                        Create Account
                    </button>
                </form>
            </div>

            {/* Modal Component */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h3 className="text-lg font-semibold mb-4">Interest Rates</h3>
                        <p>1 year  ≤ Tenure {"<"} 2 years: 7%</p>
                        <p>2 years ≤ Tenure {"<"} 3 years: 7.9%</p>
                        <p>3 years ≤ Tenure {"<"} 5 years: 8.08%</p>
                        <button
                            onClick={toggleModal}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddAccount;
