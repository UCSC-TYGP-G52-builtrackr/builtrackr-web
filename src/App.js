import { Login } from './pages/Login/Login';
import {Register} from './pages/SignUp/Register';
import {RegisterTwo} from './pages/SignUp/RegisterTwo';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatSpace from './components/ChatSpace';
import Sites from './pages/chiefEngineer/Sites';
import './App.css';
import { Board } from './pages/KanbanBoard/Board';
import { useStateContext } from './contexts/ContextProvider';
import {Drop} from './components/DropDown/Drop';
import { Test } from './components/Comment/test';
import { DashboardW } from './pages/Warehouse/DashboardW';
import ItemList from './pages/Warehouse/ItemList';


function App() {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, themeSettings, setThemeSettings } = useStateContext();

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
              {themeSettings && (<ChatSpace />)}

              <Routes>
                {/* dashboard  */}
                <Route path="/chiefEngineer" element={(<Sites />)} />
                <Route path  = "/Register" element = {<Register /> } />
                <Route path  = "/RegisterTwo" element = {<RegisterTwo /> } />
                <Route path  = "/Login" element = {<Login /> } />
                <Route path  = "/KanbanBoard" element = {<Board /> } />

                <Route path="/dropdown" element={(<Drop />)} />
                <Route path="/test" element={(<Test />)} />
                {/* pages  */}
                <Route path="/chiefEngineer/sites" element={<Sites />} />
                <Route path="/chiefEngineer/tasks" element={<Sites />} />
                <Route path= "/Equipments" element={<DashboardW />} />
                <Route path= "Equipments/List" element={<ItemList/>} />

              </Routes>

            {/* <Footer /> */}

      </BrowserRouter>
    </div>
  );
}

export default App;
      