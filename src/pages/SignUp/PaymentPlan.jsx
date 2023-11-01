import { Link } from "react-router-dom";
import "./payment.css";
import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
const steps = [
  "Enter Company Details",
  "Verify email and set Credentials",
  "Payment",
];

const PaymentPlan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formDataNew = location.state;
  if (!formDataNew) {
    return <div>No form data found.</div>;
  }
  const {
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
  } = formDataNew;

  const formData = {
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
  };
  console.log(formData);

  const selectPlan = (type) => {
    formData.plan = type;
    formData.type = 1;
    navigate("/paycheckout", { state: formData });
  };

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          fontSize: "20px",
          marginTop: "20px",
          fontWeight: "600",
        }}
      >
        Select a Payment paln
      </h1>

      <div className="background-box">
        <div className="container">
          <div className="panel pricing-table">
            <div className="pricing-plan">
              <img
                src="https://i.postimg.cc/mrcYNX5X/6895861.jpg"
                alt=""
                className="pricing-img"
              />
              <h2 className="pricing-header">Basic</h2>
              <ul className="pricing-features">
                <li className="pricing-features-item">Only 2 Site Mangement</li>
                <li className="pricing-features-item">Future Addons</li>
              </ul>
              <span style={{ marginTop: "70px" }} className="pricing-price">
                LKR 10000{" "}
              </span>

              <button onClick={() => selectPlan(1)} className="pricing-button">
                Proceed
              </button>
            </div>
            <div className="pricing-plan">
              <img
                src="https://i.postimg.cc/K8jBxpxG/4334841.jpg"
                alt=""
                className="pricing-img"
              />
              <h2 className="pricing-header">Recommended</h2>
              <ul className="pricing-features">
                <li className="pricing-features-item">5 Site Mangement</li>
                <li className="pricing-features-item">24 / 7 Support </li>
                <li className="pricing-features-item">Future Addons</li>
              </ul>
              <span className="pricing-price"> LKR 20000</span>
              <button onClick={() => selectPlan(2)} className="pricing-button">
                Proceed
              </button>
            </div>
            <div className="pricing-plan">
              <img
                src="https://i.postimg.cc/NFTQwHj7/bridge-construction-amico-copy.png"
                alt=""
                className="pricing-img"
              />

              <h2 className="pricing-header">Enterprise</h2>
              <ul className="pricing-features">
                <li className="pricing-features-item">20 Site Mangement</li>
                <li className="pricing-features-item">24 / 7 Support </li>
              </ul>
              <span style={{ marginTop: "70px" }} className="pricing-price">
                LKR 30000
              </span>
              <button onClick={() => selectPlan(3)} className="pricing-button">
                Proceed
              </button>
            </div>
          </div>
        </div>
        <div
          style={{
            paddingBottom: "20px",
            width: "70%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "20px",
          }}
        >
          <Stepper activeStep={2} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
      </div>
    </>
  );
};

export default PaymentPlan;
