import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendOTP = async (e) => {
    e.preventDefault();
    setEmailErr("");
    let emailExist = false;
    if (email === "") {
      setEmailErr("Enter your email");
      return;
    }
    setIsLoading(true);
    try {
      await axios
        .post("http://localhost:4000/api/user/userExists", { email: email })
        .then((res) => {
          if (res.data.status) {
            emailExist = true;
          }
        });
    } catch (err) {
      console.log(err);
    }
    try {
      await axios
        .post("http://localhost:4000/api/employee/employeeExists", {
          email: email,
        })
        .then((res) => {
          if (res.data.status) {
            emailExist = true;
          }
        });
    } catch (err) {
      console.log(err);
    }
    if (emailExist) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      console.log(OTP);
      try {
        await axios
          .post("http://localhost:4000/api/user/sendResetOTP", {
            email: email,
            OTP: OTP,
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              navigate("/OTPVerify", { state: { email: email, OTP: OTP } });
            }
          });
      } catch (err) {
        toast.error(err);
        console.log(err);
      }
    } else {
      setEmailErr("Email does not exist");
    }
    setIsLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <div class="min-h-screen flex items-start justify-center bg-gray-100">
        <div class="max-w-md w-full px-6 py-8 mt-10 bg-white shadow-md">
          <h2 class="text-2xl font-semibold mb-4">Forgot Password</h2>
          <p class="text-gray-600 mb-6">
            Please enter your email address to receive a OTP to verify your
            email.
          </p>
          <form>
            <div class="mb-4">
              <label
                for="email"
                class="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                value={email}
                required
                class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailErr && (
                <p
                  style={{
                    marginTop: "-8px",
                    marginLeft: "15px",
                    fontSize: "14px",
                    color: "#d32f2f",
                  }}
                >
                  {emailErr}
                </p>
              )}
            </div>
            <div class="flex items-center justify-center">
              {!isLoading ? (
                <button
                  type="submit"
                  style={{ backgroundColor: "#FFCC00" }}
                  class=" text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={sendOTP}
                >
                  Send OTP
                </button>
              ) : (
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
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
