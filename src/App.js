import { Login } from "./pages/Login/Login";
import { Register } from "./pages/SignUp/Register";
import { RegisterTwo } from "./pages/SignUp/RegisterTwo";
import AdminHome from "./pages/CompanyAdmin/AdminHome";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ChatSpace from "./components/CompanyAdmin/ChatSpace";

import { useStateContext } from "./contexts/ContextProvider";
import ProtectedRoutes from "./ProtectedRoutes";
import Test from "./pages/CompanyAdmin/Test";

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
    // <div className="App">
    //   {/* <Routes>
    //     <Route path  = "/Register" element = {<Register /> } />
    //     <Route path  = "/RegisterTwo" element = {<RegisterTwo /> } />
    //     <Route path  = "/Login" element = {<Login /> } />
    //     <Route path="/dashboard/*" element ={ <Dashboard/> } />
    //   </Routes> */}
    //     <Routes>
    //     <Route path="/chiefEngineer" element={<SidebarChiefEng />}>
    //       <Route path="sites" element={<Sites />} />
    //       <Route path="tasks" element={<Tasks />} />
    //     </Route>
    //     </Routes>
    // </div>

    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        {themeSettings && <ChatSpace />}

        <Routes>
          {/* dashboard  */}
          {/* <Route path="/chiefEngineer" element={(<Sites />)} /> */}
          <Route path="/Register" element={<Register />} />
          <Route path="/RegisterTwo" element={<RegisterTwo />} />
          <Route path="/Login" element={<Login />} />

          {/* Routes for Company admin 
              All routes of admin should be inside
          */}
          <Route element={<ProtectedRoutes type={1} />}>
            <Route path="/admin" element={<AdminHome/>}/>
          </Route>

          <Route path="/test" element={<Test />} />


          {/* <Route path  = "/KanbanBoard" element = {<Board /> } /> */}
          {/* <Route path="/ecommerce" element={(<Ecommerce />)} /> */}

          {/* pages  */}
          {/* <Route path="/chiefEngineer/sites" element={<Sites />} />
                <Route path="/chiefEngineer/tasks" element={<Sites />} /> */}

          {/* <Route path="/orders" element={<Orders />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/customers" element={<Customers />} /> */}
        </Routes>

        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
