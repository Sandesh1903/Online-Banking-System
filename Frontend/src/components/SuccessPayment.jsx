import axios from "axios";
import { useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const SuccessPayment = () => {
    const [flag, setFlag] = useState(false);
    const [params] = useSearchParams();
    const billType = params.get("billType");
    const accountId = params.get("accountId");
    const navigate = useNavigate();

    const checkAutopayStatus = async () => {
        const data = {
            billType,
            accountId
        }
        const response = await axios.post("http://localhost:9999/recurring_txn/check_autopay_status", data, { withCredentials: true });
        console.log(response.status, "hh");
        setFlag(response.data)
        if (response.data == "Invalid Id") {
            navigate("/dashboard");
        }
    }
    useEffect(() => {
        checkAutopayStatus();
    }, []);

    const handleAutopay = async (isAutopay) => {
        console.log(isAutopay);
        const data = {
            billType,
            accountId,
            enabled: isAutopay
        }
        const response = await axios.post("http://localhost:9999/recurring_txn/update_autopay_status", data, { withCredentials: true });
        console.log(response.data.enabled);
        setFlag(isAutopay);
        if (response.data.enabled) {
            toast.success("Set on autopay!");
        } else {
            toast.success("Removed autopay!");
        }
        navigate("/dashboard");
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 w-1/2 shadow-lg text-center rounded-lg">
                <h1 className="text-2xl font-bold text-green-600 mb-4">Bill Paid Successful</h1>
                <div className="flex justify-center pb-3">
                    <BiCheckCircle className="text-5xl text-green-600" />
                </div>

                {!flag ?
                    <div className="pt-2">
                        <p className="text-gray-700 mb-2">Would you like to set on autopay?</p>
                        <button className="mt-3 p-2 bg-darkBulish text-white rounded-lg" onClick={(e) => handleAutopay(true)}>Set Autopay</button>
                    </div> :
                    <div>
                        <p className="text-gray-700 mb-2">Autopay is set on this payment already.</p>
                        <p className="text-gray-600 italic">
                            To disable the autopay
                        </p>
                        <p className="text-gray-600 italic">
                            click <button className="text-darkBulish font-bold underline hover:text-blue-800" onClick={(e) => handleAutopay(false)}>here</button>
                        </p>
                    </div>
                }

            </div>
        </div>
    )
}

export default SuccessPayment;