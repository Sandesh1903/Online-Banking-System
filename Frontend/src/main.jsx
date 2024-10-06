import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AxiosInterceptor } from './middlewares/AxiosInterceptor1'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <ToastContainer />
    <BrowserRouter>
      <AxiosInterceptor />
      <App />
    </BrowserRouter>
  </>

)
