import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
// import Topbar from '../../components/Topbar';
import Sidebar from '../../components/Sidebar';
import Analytics from './Analytics';
import Employees from './Employees'
import Sites from './Sites'


const Dashboard = () => {
  return (
    <div>
        <Sidebar/>
      <div>
        <Routes>
          <Route path="/dashboard/Analytics" element={<Analytics/>} />
          <Route path="/dashboard/Employees" element={<Employees/>} />
          <Route path="/dashboard/Sites" element={<Sites/>} />
        </Routes>
        </div>
    </div> 
  );
};

export default Dashboard;