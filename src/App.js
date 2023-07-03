import './App.css';
// import './CSS/dashboard.css'
import { Login } from './pages/Login/Login';
import {Register} from './pages/SignUp/Register';
import {RegisterTwo} from './pages/SignUp/RegisterTwo';
// import {Login} from './Login';
import {Routes , Route} from "react-router-dom";
import ComponentSidebar from './components/ComponentSidebar';
import SidebarItem from './components/ComponentSidebar';
import Dashboard from './pages/dashboard/Dashboard';
import Topbar from './components/Topbar';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path  = "/Register" element = {<Register /> } />
        <Route path  = "/RegisterTwo" element = {<RegisterTwo /> } />
        <Route path  = "/Login" element = {<Login /> } />
        <Route path="/dashboard/*" element ={ <Dashboard/> } />
      </Routes>
      
    </div>
  );
}

export default App;
      