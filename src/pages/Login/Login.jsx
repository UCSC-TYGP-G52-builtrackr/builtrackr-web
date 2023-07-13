import { Link,useNavigate } from "react-router-dom";
import { React, useState } from "react";
import { Validation } from "./validation";
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { alignProperty } from "@mui/material/styles/cssUtils";


export function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  function handleInput(event) {
    const newObj = { ...values, [event.target.name]: event.target.value };
    setValues(newObj);
  }
  
  async function handleValidation(event) {
    console.log(values);
    event.preventDefault();
    setErrors(Validation(values));
    console.log(errors);
    try {
      await axios.post('http://localhost:4000/api/user/auth', values)
      .then(res => {
        if(res.status === 201){
          console.log(res.data);
          toast.success("Login Successfull")
          setTimeout(() => {
            navigate('/siteManager')
          }
          , 2000);
        }else{
          toast.error("Login Failed")
        }
      })
      // navigate('/home')
    } catch (err) {
      console.log(err.response.data.message); // "Request failed with status code 500"
      toast.error(err.response.data.message)
      
    }
  }
  return (
    <div className="grid-container">
      <ToastContainer/>
      <div className="form_body">
        {/* left side grid image */}
        <div className="grid_left" style ={{marginTop :"5%"}}>
          <form>
          <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">Login To</h1>
          <h2 class="text-4xl font-extrabold dark:text-black" style={{color :"#ffcc00", marginBottom:"5%"}}>BuilTrackr</h2>
            <span>
              If you don't have an account you can{" "}
              <Link to="/Register">
                <b>Register Here !</b>
              </Link>
            </span>
            <br />
            <img className="image_1" src="../login.jpg" alt="image_1" />
          </form>
        </div>

        {/*right side grid form */}
        <div className="grid_right">
          <form className="register_form" onSubmit={handleValidation}>
          <h2 class="text-4xl font-extrabold dark:text-black" style={{ marginBottom:"6%"}}>Log In</h2>
            <div className="form-info">
              <label>User Name</label>
              <input
                type="email"
                placeholder=" name@email.com"
                name="email"
                id="email"
                value={values.email}
                onChange={handleInput}
              ></input>
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
              <label>Password</label>
              <input
                type="password"
                placeholder=" Enter Your Password"
                name="password"
                id="password"
                value={values.password}
                onChange={handleInput}
              ></input>
              <br />
              {errors.password && (
                <p style={{ color: "red" }}>{errors.password}</p>
              )}
              <a href="forgotPassword" >Forgot Password?</a> <br/>
              <button className="next_button" type="submit">
                {" "}
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
