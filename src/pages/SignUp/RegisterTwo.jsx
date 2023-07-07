import "../../CSS/register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Validation } from "../Login/validation";
import axios from "axios";

export const RegisterTwo = () => {
  const [values, setValues] = useState({
    email: "",
    username: "",
    OTP:"",
    password: "",
    cPassword: "",
  });

  const [errors, setErrors] = useState({ OTP:"",username: "",password: "", cPassword: ""});
  function handleInput(event) {
    const newObj = { ...values, [event.target.name]: event.target.value };
    setValues(newObj);
  }


  function handleValidation(event) {
    console.log(values);
    event.preventDefault();
    console.log(errors);

    setErrors({
      username: values.username.trim().length === 0 ? "User Name required" : "",
      OTP: values.OTP.trim().length === 0 ? "OTP required" : "",
      password: values.password.trim().length === 0 ? "Password required" : "",
      cPassword:values.cPassword.trim()===""?"Confirm Password required":values.password.trim()===values.cPassword.trim()?"":"Password does not match",
      
    });
    
  }
  const location = useLocation();
  const formData = location.state;
  if (!formData) {
    return <div>No form data found.</div>;
  }
  // Access the form values
  const { email, name, regNo, line1, line2, contactNo } = formData;
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(name);
    console.log(regNo);
    console.log(line1);
    console.log(line2);
    console.log(contactNo);
  };
  let emailEle = document.querySelector('#email');
  let verfEle = document.querySelector('.verification');
  let successEle = document.querySelector('.success');
  let errorEle = document.querySelector('.error');
  let otp_inputs = document.querySelectorAll('.otp_num');
  let emailpartialEle = document.querySelector('.emailpartial');
  let regex = new RegExp('[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3}');
  let otp_check = '';
  let userEmail;
  

  otp_inputs.forEach(
      (ip) => {
          ip.addEventListener('keyup', moveNext)
      }
  )

  function moveNext(event) {
      // otp_num_4

      let current = event.target;
      let index = current.classList[1].slice(-1);
      if (event.keyCode == 8 && index > 1) {
          current.previousElementSibling.focus()
      }
      else if (index < 4) {
          current.nextElementSibling.focus()

      }
      otp_check = '';
      for (let ip of otp_inputs) {
          otp_check += ip.value
      }
      if (otp_check.length == 4) {
          verifyOTP()
      }





  }

  function verifyOTP() {
      fetch('http://localhost:4000/verify',
          {
              method: "POST",
              body: JSON.stringify({
                  "email": `${email}`,
                  "otp": `${otp_check}`
              }),
              headers: { 'Content-Type': 'application/json' }


          }
      )
          .then(
              (res) => {
                  console.log(res)
                  if (res.status == 200) {
                      verfEle.style.display = 'none';
                      successEle.style.display = 'block';
                      errorEle.style.display = 'none';

                  }
                  else {
                      errorEle.style.display = 'block';
                      errorEle.innerHTML = "Invalid OTP";
                      successEle.style.display = 'none';

                  }
              }
          )

  }



  function sendOTP() {
    console.log(email);
    userEmail = email;
      if (regex.test(userEmail)) {
          fetch('http://localhost:4000/api/user/sendotp', {
              method: "POST",
              body: JSON.stringify({
                  "email": `${userEmail}`
              }),
              headers: { 'Content-Type': 'application/json' }
          })
              .then(
                  (res) => {
                      if (res.status === 200) {
                          // verfEle.style.display = 'block';
                          // emailpartialEle.innerHTML = userEmail
                          console.log("OTP sent");
                      }
                      else {
                          // errorEle.style.display = 'block';
                          // errorEle.innerHTML = "Email not exist";
                          // successEle.style.display = 'none';

                      }
                  }
              )

      }
      else {
          // errorEle.style.display = 'block';
          // errorEle.innerHTML = "Invalid Email";
          // successEle.style.display = 'none';

      }

  }

  return (
    //grid start
    <div className="grid-container">
      <div className="form_body">
        {/* left side grid image */}
        <div className="grid_left">
          <form>
            <h1>Sign Up To</h1>
            <h3>Builtrackr</h3>
            <span>
              If you already have an account{" "}
              <Link to="/Login">
                <b>Login Here !</b>
              </Link>
            </span>
            <br />
            <img className="image_1" src="./register.jpg" alt="image_1" />
          </form>
        </div>
        {/*right side grid form */}
        <div className="grid_right">
          <form className="register_form" onSubmit={handleValidation}>
            <h1>Complete Registration</h1>
            <div className="form-info">
              <label>Email Address</label>
              <input
                type="email"
                class="email"
                placeholder={email}
                name="email"
                id="email"
                value={email}
                onChange={handleInput}
              ></input>
              <br />
              <button className="next_buttonOtp" onClick={sendOTP()}>Send OTP</button>
              <label>Enter OTP</label>
              <div className="otp-input-fields">
                <input type="number" className="otp_num otp_num_1" maxlength="1"/>
                <input type="number" className="otp_num otp_num_2" maxlength="1"/>
                <input type="number" className="otp_num otp_num_3" maxlength="1"/>
                <input type="number" className="otp_num otp_num_4" maxlength="1"/>
            </div>
            {errors.OTP && (
                <p style={{ color: "red" }}>{errors.OTP}</p>
              )}
              <label>User Name</label>
              <input
                type="text"
                name="username"
                id="uname"
                placeholder=" Enter User Name"
              ></input>
              {errors.username && (
                <p style={{ color: "red" }}>{errors.username}</p>
              )}
              <label>Password</label>
              <input
                type="password"
                placeholder=" Enter Your Password"
                name="password"
                id="pwd"
                value={values.password}
                onChange={handleInput}
              ></input>
              <br />
              {errors.password && (
                <p style={{ color: "red" }}>{errors.password}</p>
              )}
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder=" Re-Enter Your Password"
                name="cPassword"
                id="cpwd"
                value={values.cPassword}
                onChange={handleInput}
              ></input>
              <br />
              {errors.cPassword && (
                <p style={{ color: "red" }}>{errors.cPassword}</p>
              )}
              <button className="next_button" type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
