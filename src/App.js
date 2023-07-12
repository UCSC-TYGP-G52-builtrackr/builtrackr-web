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

    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="relative flex dark:bg-main-dark-bg">

          {/* chatbot popup */}
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ backgroundColor: 'yellow-400', borderRadius: '50%' }}
                className="p-3 text-3xl text-white bg-yellow-400 hover:drop-shadow-xl"
              >
                <BsChatDots />
              </button>
          </div>
          
          {activeMenu ? (
            <div className="fixed bg-white w-72 sidebar dark:bg-secondary-dark-bg ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed w-full md:static bg-main-bg dark:bg-main-dark-bg navbar ">
              <Navbar />
            </div>
            <div>
              {themeSettings && (<ChatSpace />)}

          {/* pages part */}
              <Routes>
                {/* dashboard  */}
                <Route path="/chiefEngineer" element={(<Sites />)} />
                <Route path  = "/Register" element = {<Register /> } />
                <Route path  = "/RegisterTwo" element = {<RegisterTwo /> } />
                <Route path  = "/Login" element = {<Login /> } />
                {/* <Route path="/ecommerce" element={(<Ecommerce />)} /> */}

                {/* pages  */}
                <Route path="/chiefEngineer/sites" element={(<Sites />)} />
                <Route path="/chiefEngineer/tasks" element={(<Sites />)} />
                {/* <Route path="/orders" element={<Orders />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/customers" element={<Customers />} /> */}
              
              </Routes>
            </div>
            {/* <Footer /> */}
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
      