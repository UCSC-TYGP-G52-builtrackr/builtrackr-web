import './App.css';
// import './CSS/dashboard.css'
import { Login } from './pages/Login/Login';
import {Register} from './pages/SignUp/Register';
import {RegisterTwo} from './pages/SignUp/RegisterTwo';
// import {Login} from './Login';
import {Routes , Route} from "react-router-dom";
import Dashboard from './pages/dashboard/Dashboard';
import SMDashboard from './pages/SiteManger/Dashboard'
import Home from './pages/index'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    
   

    <div className="App">
      <ChakraProvider>

      <Routes>
        <Route path  = "/Register" element = {<Register /> } />
        <Route path  = "/RegisterTwo" element = {<RegisterTwo /> } />
        <Route path  = "/Login" element = {<Login /> } />
        <Route path="/dashboard/*" element ={ <Dashboard/> } />
        <Route path="/home" element ={ <Home/> } />
        <Route path="/sitemanager" element ={<SMDashboard/>} />

      </Routes>
      </ChakraProvider>
      
    </div>
  );
}

export default App;
      