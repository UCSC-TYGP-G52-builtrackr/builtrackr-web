import { PaymentElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import TextField from "@mui/material/TextField";

export default function CheckoutForm({ setPaymentDone, plan }) {
  const lkrFormatter = new Intl.NumberFormat("si-LK", {
    style: "currency",
    currency: "LKR",
  });
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [amount, setAmount] = useState("");
  useEffect(() => {
    plan === 1 && setAmount(lkrFormatter.format(10000));
    plan === 2 && setAmount(lkrFormatter.format(20000));
    plan === 3 && setAmount(lkrFormatter.format(30000));
    if(plan !== 1 && plan !== 2 && plan !== 3){
      const value = (plan-10)*5000;
      setAmount(lkrFormatter.format(value))
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
      redirect: "if_required",
    });


    if (error) {
      // Show error to your customer
      setMessage(error);
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occured.");
      }
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // The payment has been processed!
      setMessage("Payment status : " + paymentIntent.status + "Done");
      setPaymentDone(true);
    } else {
      setMessage("Payment status : " + paymentIntent.status + "Not Done");
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <label style={{ marginBottom: "0" }}>Amount</label>
      <TextField
        id="outlined-basic"
        variant="outlined"
        size="small"
        value={amount}
        style={{ marginBottom: "20px" }}
        disabled
      />

      <button disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>

  );
}
