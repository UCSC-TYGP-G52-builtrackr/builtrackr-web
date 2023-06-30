import './App.css';
import { Login } from './pages/Login/Login';
import {Register} from './pages/SignUp/Register';
import {RegisterTwo} from './pages/SignUp/RegisterTwo';
// import {Login} from './Login';
import {Routes , Route} from "react-router-dom";

function App() {
  return (
    <div className="App">

 
  <Routes>
  <Route path  = "/Register" element = {<Register /> } />
  <Route path  = "/RegisterTwo" element = {<RegisterTwo /> } />
  <Route path  = "/Login" element = {<Login /> } />
  </Routes>
    </div>
  );
}

export default App;
