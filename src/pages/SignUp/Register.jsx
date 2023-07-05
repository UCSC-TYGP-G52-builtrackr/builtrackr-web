import { React, useEffect, useState } from "react";
import "../../CSS/register.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [certificate, setCertificate] = useState("");
  const [errors, setErrors] = useState({ name: "", contactNo: ""});

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name,
      regNo,
      email,
      line1,
      line2,
      contactNo,
    };

    if (name.trim().length !== 0 && contactNo.trim().length !== 0) {
      navigate("/RegisterTwo", { state: formData });

      // Reset the form after submission
      setName("");
      setRegNo("");
      setEmail("");
      setLine1("");
      setLine2("");
      setContactNo("");
      setErrors({ name: "", contactNo: "" });
    } else {
      setErrors({
        name: name.trim().length === 0 ? "User Name required" : "",
        contactNo:
          contactNo.trim().length === 0 ? "Contact Number required" : "",
        regNo: regNo.trim().length === 0 ? "Register Number required" : "",
        email: email.trim().length === 0 ? "Email required" : "",
      });
    }
  };

  return (
    <div className="grid-container">
      <div className="form_body">
        <div className="grid_left">
          <form>
            <h1>Sign Up To</h1>
            <h2>Builtrackr</h2>
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
            <h1>Sign Up</h1>
            <div className="form-info">
              <label>Company Name</label>
              <input
                type="text"
                placeholder="Company Name"
                name="name"
                value={name}
                onChange={handleChange}
              />
              {errors.name && <div className="error">{errors.name}</div>}
              <label>Company Register Number</label>
              <input
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
                value={certificate}
                onChange={(e) => setCertificate(e.target.value)}
                class="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-white file:text-black
      hover:file:bg-orange-500 hover:file:text-white
    "
              />
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Company Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div className="error">{errors.email}</div>}
              <label>Company Address</label>
              <input
                type="text"
                placeholder="Address Line 1"
                name="line1"
                value={line1}
                onChange={(e) => setLine1(e.target.value)}
              />
              <br />
              <input
                type="text"
                placeholder="Address Line 2"
                name="line2"
                value={line2}
                onChange={(e) => setLine2(e.target.value)}
              />
              <label>Fixed Line Number</label>
              <input
                type="tel"
                name="contactNo"
                value={contactNo}
                onChange={handleNumber}
              />
              {errors.contactNo && (
                <div className="error">{errors.contactNo}</div>
              )}
              <br />
              <button className="next_button" type="submit">
                Next Page
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
