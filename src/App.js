import { Login } from './pages/Login/Login';
import {Register} from './pages/SignUp/Register';
import {RegisterTwo} from './pages/SignUp/RegisterTwo';
// import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Link, Route } from 'react-router-dom';
import { BsChatDots } from 'react-icons/bs';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ChatSpace from './components/ChatSpace';
import ForgotPassword from './pages/Login/Forgotpassword'
import ResetPassword from './pages/Login/ResetPassword'
import Task from './pages/SiteManager/Task'
import Home from './pages/index'
import Sites from './pages/chiefEngineer/Sites';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';

function App() {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path  = "/Register" element = {<Register /> } />
        <Route path  = "/RegisterTwo" element = {<RegisterTwo /> } />
        <Route path  = "/Login" element = {<Login /> } />
        <Route path="/dashboard/*" element ={ <Dashboard/> } />
        <Route path="/home" element ={ <Home/> } />
        <Route path="/sitemanager" element ={<SMDashboard/>} />
        <Route path="/viewtask" element ={<Task/>} />
        <Route path="/forgotPassword" element ={<ForgotPassword/>} />
        <Route path="/resetPassword" element ={<ResetPassword/>} />
        {/* <Route path="/sitemanager/supervisor" element ={<SMSupervisor/>} /> */}
        <Route path="*" element={<Home />} />
      </Routes>
      
    </div>
  );
}

export default App;
      