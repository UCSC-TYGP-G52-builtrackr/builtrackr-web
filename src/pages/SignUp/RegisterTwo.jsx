import "../../CSS/register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Validation } from "../Login/validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export const RegisterTwo = () => {
  const [values, setValues] = useState({
    email: "",
    username: "",
    OTP: "",
    password: "",
    cPassword: "",
  });
  const [otpVerify, setOtpVerify] = useState(false);
  const navigate = useNavigate();
  const [verifiedMsg, setVerifiedMsg] = useState(false);
  const [errors, setErrors] = useState({
    OTP: "",
    username: "",
    password: "",
    cPassword: "",
  });
  function handleInput(event) {
    const newObj = { ...values, [event.target.name]: event.target.value };
    setValues(newObj);
  }

  // function handleValidation(event) {
  //   console.log(values);
  //   event.preventDefault();
  //   console.log(errors);

  //   setErrors({
  //     username: values.username.trim().length === 0 ? "User Name required" : "",
  //     OTP: values.OTP.trim().length === 0 ? "OTP required" : "",
  //     password: values.password.trim().length === 0 ? "Password required" : "",
  //     cPassword:values.cPassword.trim()===""?"Confirm Password required":values.password.trim()===values.cPassword.trim()?"":"Password does not match",

  //   });

  // }
  const location = useLocation();
  const formData = location.state;
  if (!formData) {
    return <div>No form data found.</div>;
  }
  // Access the form values
  const { email, name, regNo, line1, line2, city, contactNo, certificate } =
    formData;
  console.log(formData);
  const handleSubmit = async (e) => {
    setErrors({ username: "", password: "", cPassword: "", OTP: "" });
    if (otpVerify === false) {
      toast.error("Please Verify OTP");
      return;
    }
    let error = false;
    if (values.username.trim().length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "User Name Required",
      }));
      error = true;
    }
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const specialCharRegex = /[!@#$%^&*()\-_=+[{\]}|;:,<.>/?]/;
    const digitRegex = /\d/;

    const hasUppercase = uppercaseRegex.test(values.password);
    const hasLowercase = lowercaseRegex.test(values.password);
    const hasSpecialChar = specialCharRegex.test(values.password);
    const hasDigit = digitRegex.test(values.password);
    if (values.password.trim().length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password Required",
      }));
      error = true;
    } else if (values.password.trim().length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password Contains atleast 8 Characters",
      }));
      error = true;
    }
    else if (!hasUppercase || !hasLowercase || !hasSpecialChar || !hasDigit){
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password Contains atleast one Upercase, Lowercase, Special Character and Number",
      }));
      error = true;
    }
    if (values.cPassword.trim().length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cPassword: "Confirm Password Required",
      }));
      error = true;
    } else if (values.password.trim() !== values.cPassword.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cPassword: "Password does not match",
      }));
      error = true;
    }
    if (error || errors.OTP) {
      return;
    }
    else{
      try {
        const username = values.username;
        const password = values.password;
  
        await axios
          .post("http://localhost:4000/api/user/register", {
            username,
            email,
            password,
            regNo,
            line1,
            line2,
            city,
            contactNo,
            certificate,
            name,
          })
          .then((res) => {
            console.log(res);
            console.log(res.data);
            toast.success("Registered Successfully");
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          });
      } catch (err) {
        console.error(err.message); // "Request failed with status code 500"
        //console.error(err)
        toast.error(err?.data?.message || err.error);
      }
    }
    
  };

  let otp_inputs = document.querySelectorAll(".otp_num");
  let regex = new RegExp("[a-zA-Z0-9]+@[a-z]+.[a-z]{2,3}");
  let otp_check = "";
  let userEmail;

  function moveNext(event) {
    // otp_num_4

    let current = event.target;
    let index = current.classList[1].slice(-1);
    if (event.keyCode === 8 && index > 1) {
      current.previousElementSibling.focus();
    } else if (index < 4) {
      current.nextElementSibling.focus();
    }
    otp_check = "";
    for (let ip of otp_inputs) {
      otp_check += ip.value;
    }
    if (otp_check.length === 4) {
      verifyOTP();
    }
  }

  function verifyOTP(otp) {
    console.log("verify otp");
    console.log(otp);
    fetch("http://localhost:4000/api/user/verifyotp", {
      method: "POST",
      body: JSON.stringify({
        email: `${email}`,
        otp: `${otp}`,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      console.log(res);
      if (res.status == 200) {
        // verfEle.style.display = 'none';
        // successEle.style.display = 'block';
        // errorEle.style.display = 'none';
        setOtpVerify(true);
        setVerifiedMsg(true);
      } else {
        // errorEle.style.display = 'block';
        // errorEle.innerHTML = "Invalid OTP";
        // successEle.style.display = 'none';
        console.log("OTP not verified");
      }
    });
  }

  function handleOTP(e) {
    if (e.target.value.length < 5) {
      setErrors({ ...errors, OTP: "" });
      setValues({ ...values, OTP: e.target.value });
      if (e.target.value.trim().length === 4) {
        console.log(e.target.value);
        verifyOTP(e.target.value);
      }
    } else {
      setErrors({ ...errors, OTP: "OTP should be 4 digits" });
    }
  }

  function sendOTP(e) {
    e.preventDefault();
    // console.log(email);
    userEmail = email;
    if (regex.test(userEmail)) {
      fetch("http://localhost:4000/api/user/sendotp", {
        method: "POST",
        body: JSON.stringify({
          email: `${userEmail}`,
        }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        if (res.status === 200) {
          // verfEle.style.display = 'block';
          // emailpartialEle.innerHTML = userEmail
          console.log("OTP sent");
        } else {
          // errorEle.style.display = 'block';
          // errorEle.innerHTML = "Email not exist";
          // successEle.style.display = 'none';
        }
      });
    } else {
      // errorEle.style.display = 'block';
      // errorEle.innerHTML = "Invalid Email";
      // successEle.style.display = 'none';
    }
  }

  return (
    //grid start

    <div className="grid-container">
      <ToastContainer />
      <div className="form_body">
        {/* left side grid image */}
        <div className="grid_left">
          <form>
            <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
              Sign Up To
            </h1>
            <h2
              class="text-4xl font-extrabold dark:text-black"
              style={{ color: "#ffcc00", marginBottom: "5%" }}
            >
              Builtrackr
            </h2>
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
          <div className="register_form">
            <h1>
              <b>Complete Registration</b>
            </h1>
            <div className="form-info">
              <label>Email Address</label>
              <input
                type="email"
                className="email"
                placeholder={email}
                name="email"
                id="email"
                value={email}
                onChange={handleInput}
                style={{ paddingLeft: "10px" }}
              ></input>
              <br />
              <button
                style={{ backgroundColor: "#ffcc00", fontWeight: "bold" }}
                className="next_buttonOtp"
                onClick={(event) => sendOTP(event)}
              >
                Send OTP
              </button>
              <label>Enter OTP</label>
              <div className="flex items-center justify-center gap-4 ">
                <input
                  type="text"
                  className="w-2/5"
                  style={{ width: 200, textAlign: "center" }}
                  value={values.OTP}
                  onChange={handleOTP}
                />
              </div>
              {errors.OTP && <p style={{ color: "red" }}>{errors.OTP}</p>}
              {otpVerify && (
                <p className="text-green-600 font-bold text-center">
                  OTP Verified
                </p>
              )}
              <label>User Name</label>
              <input
                type="text"
                name="username"
                id="uname"
                value={values.username}
                onChange={handleInput}
                placeholder=" Enter User Name"
                style={{ paddingLeft: "10px" }}
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
                style={{ paddingLeft: "10px" }}
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
                style={{ paddingLeft: "10px" }}
              ></input>
              <br />
              {errors.cPassword && (
                <p style={{ color: "red" }}>{errors.cPassword}</p>
              )}
              <button
                className="next_button"
                type="submit"
                onClick={(e) => handleSubmit(e)}
                style={{
                  backgroundColor: "#ffcc00",
                  marginTop: "10px",
                  fontWeight: "700",
                }}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
