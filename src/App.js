import AdminHome from "./pages/CompanyAdmin/AdminHome";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatSpace from "./components/CompanyAdmin/ChatSpace";
import { useStateContext } from "./contexts/ContextProvider";
import ProtectedRoutes from "./ProtectedRoutes";
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
// import Analytics from "./pages/SiteManager/Analytics";
import Home from "./pages/index";
import SiteDashboard from "./pages/SiteManager/Sites";
// import {SMSupervisor} from './pages/SiteManager/Supervisor'
import PaymentPlan from "./pages/SignUp/PaymentPlan";
import Sites from "./pages/chiefEngineer/Sites";
import { Board } from "./pages/Supervisor/KanbanBoard/Board";
import { Drop } from "./components/DropDown/Drop";
import { Test } from "./components/Comment/test";
import { DashboardW } from "./pages/Warehouse/DashboardW";
import ItemList from "./pages/Warehouse/ItemList";
import { Material } from "./pages/Warehouse/Material";
import FileUpload from "./pages/Supervisor/Documents/Documents";
import Analytics from "./pages/Supervisor/Analytics/Analytics";
import { BsChatDots } from "react-icons/bs";
import Users from "./pages/HrManager/Users";
import LeaveDetails from "./pages/HrManager/LeaveDetails";
import Employees from "./pages/HrManager/Employees";
import Performance from "./pages/HrManager/Performance";
import SiteManagers from "./pages/chiefEngineer/SiteManagers";
import OneSite from "./pages/chiefEngineer/OneSite";
import CEAnalytics from "./pages/chiefEngineer/CEAnalytics";
import DocumentsCE from './pages/chiefEngineer/DocumentsCE'
import LaborLeaveTable from "./pages/SiteManager/Leaves";

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
      <Routes>
      <Route path  = "/Supervisor/KanbanBoard" element = {<Board /> } />
        <Route path="/home" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/RegisterTwo" element={<RegisterTwo />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/paymentplan" element={<PaymentPlan />} />
        <Route path="*" element={<Home />} />

        {/* Compnay Admin  */}
        <Route element={<ProtectedRoutes type={0} />}>
          <Route path="/admin" element={<AdminHome />} />
        </Route>
        {/* HR Manager */}
        <Route element={<ProtectedRoutes type={1} />}></Route>
        <Route path="/hrmanager/user roles" element={<Users />} />
        <Route path="/hrmanager/employees" element={<Employees />} />
        <Route path="/hrmanager/leave" element={<LeaveDetails />} />
        <Route path="/hrmanager/performance review" element={<Performance />} />
        {/* Inventory Manager */}
        <Route element={<ProtectedRoutes type={2} />}>
          <Route path="/inventorymanager/Equipments" element={<DashboardW />} />
          <Route path="InventoryManger/Equipments/List" element={<ItemList />} />
          <Route path="InventoryManger/Materials/List" element={<ItemList />} />
          <Route path="/inventorymanager/Materials" element={<Material />} />
          <Route path="/inventorymanager/documents" element={<FileUpload />} />
          <Route path="/inventorymanager/Reports" element={<Analytics />} />

        </Route>

        {/* Cheif Engineer */}
        <Route element={<ProtectedRoutes type={3} />}>
          <Route path="/chiefEngineer/sites" element={<Sites />} />
          <Route path="/chiefEngineer/site managers" element={<SiteManagers />} />
          {/* <Route path="/chiefEngineer/analytics" element={<Analytics />} /> */}
          <Route path="/chiefEngineer/sites/:id" element={<OneSite />} />
          <Route path="/chiefEngineer/Analytics" element={<CEAnalytics/>}/>
          <Route path="/chiefEngineer/documents" element={<DocumentsCE/>}/>
        </Route>
        {/* Site Manager */}
        <Route element={<ProtectedRoutes type={4} />}>
          <Route path="/sitemanager/dashboard" element={<SMDashboard />} />
          <Route path="/sitemanager/viewtask" element={<Task />} />
          <Route path="/sitemanager/supervisor" element={<SMSupervisor />} />
          <Route path="/sitemanager/documents" element={<SMDocuments />} />
          <Route path="/sitemanager/sites" element={<SiteDashboard />} />
          <Route path="/sitemanager/analytics" element={<Analytics />} />
          <Route path="/sitemanager/labourleaves" element={<LaborLeaveTable />} />
        </Route>

        {/* Site Supervisor */}
        <Route element={<ProtectedRoutes type={5} />}>
          <Route path="/Supervisor/KanbanBoard" element={<Board />} />

          <Route path="/dropdown" element={<Drop />} />
          <Route path="/test" element={<Test />} />

          <Route path="/chiefEngineer/sites" element={<Sites />} />
          <Route path="/chiefEngineer/tasks" element={<Sites />} />
          <Route path="/Equipments" element={<DashboardW />} />
          <Route path="/Equipments/List" element={<ItemList />} />
          <Route path="/Materials" element={<Material />} />
          <Route path="/Materials/List" element={<ItemList />} />
          <Route path="/Supervisor/Documents" element={<SMDocuments />} />
          <Route path="/Supervisor/Analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
