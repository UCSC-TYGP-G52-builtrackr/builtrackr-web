import { useEffect, useState } from "react";
import payment from "../../assets/images/payment_done.jpg";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import "./style.css";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
const steps = [
  "Enter Company Details",
  "Verify email and set Credentials",
  "Payment",
];

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentDone, setPaymentDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const formDataNew = location.state;
  console.log(formDataNew);
  const navigate = useNavigate();

  let amount;
  if (formDataNew.plan === 1) {
    amount = 10000;
  } else if (formDataNew.plan === 2) {
    amount = 20000;
  } else if (formDataNew.plan === 3) {
    amount = 30000;
  } else {
    amount = (formDataNew.plan - 10) * 5000;
  }

  const headerStyle = {
    textAlign: "center", // Center the text horizontally
    fontSize: "36px", // Increase the font size
  };
  useEffect(() => {
    fetch("http://localhost:4000/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount }),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (formDataNew.type === 1) {
      try {
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
            plan,
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
    } else if (formDataNew.type === 2) {
      try {
        await axios
          .post("http://localhost:4000/api/user/siteAddon", {
            company_id: formDataNew.company_id,
            amount: amount,
          })
          .then((res) => {
            toast.success("Site Addon Successfuly");
            setTimeout(() => {
              navigate("/admin/Subscription");
            }, 3000);
          });
      } catch (err) {
        toast.error(err);
      }
    }
    setIsLoading(false);
  };

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
    plan,
  } = formDataNew;

  return (
    <>
      <ToastContainer />
      <h1 style={headerStyle}>Builtrackr Payment Gateway</h1>
      <h2>Secure Payments from Worldwide</h2>
      <div className="paymentbody">
        {clientSecret && stripePromise && !paymentDone && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm setPaymentDone={setPaymentDone} plan={plan} />
          </Elements>
        )}
      </div>
      {paymentDone && (
        <div className="payment-done">
          <img src={payment} alt="Payment" />
          <h1>Payment done Succesfuly</h1>
          {isLoading ? (
            <div
              className="loading"
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <button onClick={handleSubmit}>
              {formDataNew.type === 1 && "Complete Registartion"}{" "}
              {formDataNew.type === 2 && "Complete Site Addon"}
            </button>
          )}
        </div>
      )}
      {formDataNew.type === 1 && (
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
      )}
    </>
  );
}

export default Payment;
