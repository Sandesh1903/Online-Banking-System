import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoginPage from "./components/LoginPage";
import OTPPage from "./components/OTPpage";
import Registration from "./components/Registration";
import ResetPassword from "./components/ResetPassword";
import EmailPage from "./components/EmailPage";
import MessagePage from "./components/MessagePage";
import Dashboard from "./components/Dashboard";
import AddAccount from "./components/AddAccount"
import { logout } from "./auth/logout"
import { toast } from "react-toastify"
import Profile from "./components/Profile";
import PaymentTransfer from "./components/PaymentTransfer";
import DepositAmount from "./components/DepositAmount";
import TransactionHistory from "./components/TransactionHistory";
import MyAccounts from "./components/MyAccounts";
import MyBills from "./components/MyBills";
import BillPayment from "./components/BillPayment";
import SuccessPayment from "./components/SuccessPayment";


function App() {
  const Logout = () => {
    logout();
    toast.success("Log out Successfully!!");

  }
  return (
    <Routes>
      <Route path="/" element={<LoginPage></LoginPage>}></Route>
      <Route path="/register" element={<Registration></Registration>}></Route>
      <Route path="/reset_password" element={<ResetPassword></ResetPassword>}></Route>
      <Route path="/email" element={<EmailPage></EmailPage>}></Route>
      <Route path="/otp/:navigateTo" element={<OTPPage></OTPPage>}></Route>
      <Route path="/message" element={<MessagePage></MessagePage>}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/add_account/:customerId" element={<AddAccount></AddAccount>}></Route>
      <Route path="/logout" element={<Logout />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/txn_history/:customerId" element={<TransactionHistory />}></Route>
      <Route path="/make_payment/:customerId" element={<PaymentTransfer></PaymentTransfer>}></Route>
      <Route path="/make_payment/:customerId/:autopay" element={<PaymentTransfer></PaymentTransfer>}></Route>
      <Route path="/deposit-amount" element={<DepositAmount></DepositAmount>}></Route>
      <Route path="/my_accounts/:customerId" element={<MyAccounts />} ></Route>
      <Route path="/my_bills/:customerId" element={<MyBills />} ></Route>
      <Route path="/my_billform/:bill/:customerId" element={<BillPayment />} ></Route>
      <Route path="/payment_success" element={<SuccessPayment />} ></Route>
    </Routes>
  )
}

export default App