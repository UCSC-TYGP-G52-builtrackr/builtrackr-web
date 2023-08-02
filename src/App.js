import './App.css';
// import './CSS/dashboard.css'
import { Login } from './pages/Login/Login';
import {Register} from './pages/SignUp/Register';
import {RegisterTwo} from './pages/SignUp/RegisterTwo';
// import {Login} from './Login';
import {Routes , Route} from "react-router-dom";
import SMDashboard from './pages/SiteManager/Dashboard'
import SMSupervisor from './pages/SiteManager/Supervisor'
import SMDocuments from './pages/SiteManager/Documents';
import ForgotPassword from './pages/Login/Forgotpassword'
import ResetPassword from './pages/Login/ResetPassword'
import Task from './pages/SiteManager/Task'
import Home from './pages/index'
import { ChakraProvider } from '@chakra-ui/react'
// import {SMSupervisor} from './pages/SiteManager/Supervisor'
import React from 'react';
import PaymentPlan from './pages/SignUp/PaymentPlan';

function App() {
  return (
    
   

    <div className="App">
      <ChakraProvider>

      <Routes>
        <Route path  = "/Register" element = {<Register /> } />
        <Route path  = "/RegisterTwo" element = {<RegisterTwo /> } />
        <Route path  = "/Login" element = {<Login /> } />
        <Route path="/home" element ={ <Home/> } />
        <Route path="/sitemanager" element ={<SMDashboard/>} />
        <Route path="/viewtask" element ={<Task/>} />
        <Route path="/forgotPassword" element ={<ForgotPassword/>} />
        <Route path="/resetPassword" element ={<ResetPassword/>} />
        <Route path="/sitemanager/supervisor" element ={<SMSupervisor/>} />
        <Route path="/sitemanager/documents" element ={<SMDocuments/>} />
        <Route path="/paymentplan" element ={<PaymentPlan/>} />
        <Route path="*" element={<Home />} />

      </Routes>
      </ChakraProvider>
      
    </div>
  );
}

export default App;
      