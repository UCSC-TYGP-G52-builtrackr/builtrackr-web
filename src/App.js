
import AdminHome from "./pages/CompanyAdmin/AdminHome";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatSpace from "./components/CompanyAdmin/ChatSpace";
import { useStateContext } from "./contexts/ContextProvider";
import ProtectedRoutes from "./ProtectedRoutes";
import Test from "./pages/CompanyAdmin/Test";
import "./App.css";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/SignUp/Register";
import { RegisterTwo } from "./pages/SignUp/RegisterTwo";
import SMDashboard from "./pages/SiteManager/Dashboard";
import SMSupervisor from "./pages/SiteManager/Supervisor";
import SMDocuments from "./pages/SiteManager/Documents";
import ForgotPassword from "./pages/Login/Forgotpassword";
import ResetPassword from "./pages/Login/ResetPassword";
import Task from "./pages/SiteManager/Task";
import Analytics from "./pages/SiteManager/Analytics";
import Home from "./pages/index";
import SiteDashboard from "./pages/SiteManager/Sites";
import { ChakraProvider } from "@chakra-ui/react";
// import {SMSupervisor} from './pages/SiteManager/Supervisor'
import React from "react";
import PaymentPlan from "./pages/SignUp/PaymentPlan";


function App() {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className="App">
      <ChakraProvider>
        <Routes>
       <Route element={<ProtectedRoutes type={1} />}>
            <Route path="/admin" element={<AdminHome/>}/>
          </Route>
          <Route path="/Register" element={<Register />} />
          <Route path="/RegisterTwo" element={<RegisterTwo />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sitemanager/dashboard" element={<SMDashboard />} />
          <Route path="/sitemanager/viewtask" element={<Task />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/sitemanager/supervisor" element={<SMSupervisor />} />
          <Route path="/sitemanager/documents" element={<SMDocuments />} />
          <Route path="/sitemanager/sites" element={<SiteDashboard />} />
          <Route path="/paymentplan" element={<PaymentPlan />} />
          <Route path="/sitemanager/analytics" element={<Analytics />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </ChakraProvider>

    </div>
  );
}

export default App;
