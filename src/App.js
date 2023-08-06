import { Login } from './pages/Login/Login';
import {Register} from './pages/SignUp/Register';
import {RegisterTwo} from './pages/SignUp/RegisterTwo';
// import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';
import { BsChatDots } from 'react-icons/bs';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ChatSpace from './components/ChatSpace';
import Sites from './pages/chiefEngineer/Sites';
import OneSite from './pages/chiefEngineer/OneSite';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';
import SiteManagers from './pages/chiefEngineer/SiteManagers';
import Analytics from './pages/chiefEngineer/Analytics';

function App() {

  return (
    <div>
      <Router> 
        <div>
          <Routes>
            <Route path="/chiefEngineer/sites" element={(<Sites />)} />
            <Route path="/chiefEngineer/site managers" element={(<SiteManagers />)} />
            <Route path="/chiefEngineer/analytics" element={(<Analytics />)} />
            <Route path="/chiefEngineer/sites/:id" element={(<OneSite />)} />
            {/* <Route path="/chiefEngineer/siteInfo/:id" element={(<OneSite />)} /> */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
      