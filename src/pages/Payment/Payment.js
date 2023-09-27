import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import "./style.css"

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const headerStyle = {
    textAlign: 'center', // Center the text horizontally
    fontSize: '36px',   // Increase the font size
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
      body: JSON.stringify({}),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <>
    
    <h1 style={headerStyle}>Builtrackr Payment Gateway
    </h1>
    <h2>Secure Payments from Worldwide</h2>
    <div className="paymentbody">
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
      </div>
    </>
  );
}

export default Payment;
