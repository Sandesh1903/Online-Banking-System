import { BiCheckCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

const MessagePage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 shadow-lg text-center rounded-lg">
                <h1 className="text-2xl font-bold text-green-600 mb-4">Registration Successful</h1>
                <div className="flex justify-center pb-3">
                    <BiCheckCircle className="text-5xl text-green-600" />
                </div>
                <p className="text-gray-700 mb-2">Credentials have been sent to your email.</p>
                <p className="text-gray-600 italic">
                    Note: Please verify the email to log in. A verification link has been sent to the same email.
                </p>
                <p className="text-gray-600 italic">
                    you can login <Link to='/' className="text-darkBulish font-bold underline hover:text-blue-800">here</Link>
                </p>
            </div>
        </div>
    )
}

export default MessagePage;