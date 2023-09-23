import { React, useEffect, useState } from "react";
import "../../CSS/register.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [certificate, setCertificate] = useState({});
  const [errors, setErrors] = useState({ name: "", contactNo: "", email: "", regNo: "", line1: "", line2:"", city:"", certificate: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setName(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim().length <= 1 ? "User Name required" : "",
    }));
  };

  const handleNumber = (event) => {
    const { value } = event.target;
    const regex = /^[0-9]{10}$/;
    setContactNo(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      contactNo: regex.test(value.trim()) ? "" : "Invalid Number",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      regNo,
      certificate,
      email,
      line1,
      line2,
      city,
      contactNo,
    };

    try {
      await axios
        .post("http://localhost:4000/api/user/userExists", formData)
        .then((res) => {
          if (res.data.status) {
            toast.error("Email Already exist");
            return;
          } else {
            let error = false;
            setErrors((prevErrors) => ({
              ...prevErrors,
              name: "",
              contactNo: "",
              email: "",
              regNo: "",
              line1: "",
              line2: "",
              city: "",
              certificate: "",
            }));

            if(name.trim().length === 0){
              setErrors((prevErrors) => ({
                ...prevErrors,    
                name: "User Name Required",   
              }));
              error = true;
            }else if((/^[A-Za-z ]+$/).test(name.trim()) === false){    
              setErrors((prevErrors) => ({
                ...prevErrors,
                name: "Username should only contain letters",   
              }));
              error = true;
            }
            if(regNo.trim().length === 0){
              setErrors((prevErrors) => ({
                ...prevErrors,    
                regNo: "Register Number Required", 
              }));
              error = true;
            }
            if(line1.trim().length === 0){
              setErrors((prevErrors) => ({
                ...prevErrors,    
                line1: "Address Required", 
              }));
              error = true;
            }
            if(certificate.length === 0){
              setErrors((prevErrors) => ({
                ...prevErrors,    
                certificate: "Certificate Required", 
              }));
              error = true;
            }
            if(email.trim().length === 0){
              setErrors((prevErrors) => ({
                ...prevErrors,    
                email: "Email Required", 
              }));
              error = true;
            }else if((/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/).test(email.trim()) === false){
              setErrors((prevErrors) => ({
                ...prevErrors,
                email: "Invalid Email",
              }));
              error = true;
            }
            if(contactNo.trim().length === 0){
              setErrors((prevErrors) => ({
                ...prevErrors,    
                contactNo: "Fixed Number Required", 
              })); 
              error = true; 
            }else if((/^[0-9]{10}$/).test(contactNo.trim()) === false){
              setErrors((prevErrors) => ({
                ...prevErrors,
                contactNo: "Invalid Number",
              }));
              error = true;
            }
            if(line2.trim().length === 0){
              setErrors((prevErrors) => ({
                ...prevErrors,    
                line2: "Address Required", 
              }));
              error = true;
            }
            if(city.trim().length === 0){
              setErrors((prevErrors) => ({
                ...prevErrors,    
                city: "City Required", 
              }));
              error = true;
            }
            if(error === false){
              navigate("/RegisterTwo", { state: formData });
              setName("");
              setRegNo("");
              setEmail("");
              setLine1("");
              setContactNo("");
              setLine2("");
              setCity("");
              setCertificate({});

            }
            

            // if (name.trim().length !== 0 && contactNo.trim().length !== 0) {
            //   navigate("/RegisterTwo", { state: formData });

            //   // Reset the form after submission
            //   setName("");
            //   setRegNo("");
            //   setEmail("");
            //   setLine1("");
            //   setContactNo("");
            //   setErrors({ name: "", contactNo: "" });
            // } else {
            //   setErrors({
            //     name: name.trim().length === 0 ? "User Name Required" : "",
            //     contactNo:
            //       contactNo.trim().length === 0 ? "Fixed Number Required" : "",
            //     regNo:
            //       regNo.trim().length === 0 ? "Register Number Required" : "",
            //     line1: line1.trim().length === 0 ? "Address Required" : "",
            //     email: email.trim().length === 0 ? "Email Required" : "",
            //     certificate: !certificate.file ? "Certificate Required" : "",
            //   });
            // }
            }
        });
    } catch (err) {
      toast.error(err.response.data.error);
      return;
    }
  };

  return (
    <div className="grid-container">
      <ToastContainer />
      <div className="form_body">
        <div className="grid_left" style={{ marginTop: "5%" }}>
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
                <b>Login Here!</b>
              </Link>
            </span>
            <br />
            <img className="image_1" src="./register.jpg" alt="image_1" />
          </form>
        </div>
        <div className="grid_right">
          <form className="register_form" onSubmit={handleSubmit}>
            <h2
              class="text-4xl font-extrabold dark:text-black"
              style={{ marginBottom: "5%" }}
            >
              Sign Up
            </h2>
            <div className="form-info">
              <label>Company Name</label>
              <input
                className="p-2"
                type="text"
                placeholder="Company Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <div className="error">{errors.name}</div>}
              <label>Company Register Number</label>
              <input
                className="p-2"
                type="text"
                placeholder="PVXXXXX"
                name="regNo"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
              />
              {errors.regNo && <div className="error">{errors.regNo}</div>}
              <label>Upload BR certificate </label>
              <input
                type="file"
                placeholder="upload PDF"
                name="certificate"
                accept=".pdf"
                onChange={(e) => setCertificate(e.target.files[0])}
                className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-white file:text-black
      hover:file:bg-orange-500 hover:file:text-white
    "
              />
              {errors.certificate && (
                <div className="error">{errors.certificate}</div>
              )}
              <label>Email Address</label>
              <input
                className="p-2"
                type="email"
                placeholder="Company Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div className="error">{errors.email}</div>}
              <label>Company Address</label>
              <input
                className="p-2"
                type="text"
                placeholder="Address"
                name="line1"
                value={line1}
                onChange={(e) => setLine1(e.target.value)}
              />
              {errors.line1 && <div className="error">{errors.line1}</div>}
              <br />
              <input
                className="p-2"
                type="text"
                placeholder="Address Line 2"
                name="line2"
                value={line2}
                onChange={(e) => setLine2(e.target.value)}
              />
              {errors.line2 && <div className="error">{errors.line2}</div>}
              <br />
              <input
                className="p-2"
                type="text"
                placeholder="City"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              {errors.city && <div className="error">{errors.city}</div>}
              <label>Fixed Line Number</label>
              <input
                className="p-2"
                placeholder="Fixed Line Number"
                type="tel"
                name="contactNo"
                value={contactNo}
                onChange={(e) =>  setContactNo(e.target.value)}
              />
              {errors.contactNo && (
                <div className="error">{errors.contactNo}</div>
              )}
              <br />
              <button
                className="next_button"
                type="submit"
                style={{
                  backgroundColor: "#ffcc00",
                  marginTop: "10px",
                  fontWeight: "700",
                }}
              >
                Next Page
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
