import { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state;
  const { email } = formData;
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log(email);

  const resetPassword = async (e) => {
    e.preventDefault();
    let hasErrors = false;
    setConfirmPasswordErr("");
    setPasswordErr("");
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const specialCharRegex = /[!@#$%^&*()\-_=+[{\]}|;:,<.>/?]/;
    const digitRegex = /\d/;

    const hasUppercase = uppercaseRegex.test(password);
    const hasLowercase = lowercaseRegex.test(password);
    const hasSpecialChar = specialCharRegex.test(password);
    const hasDigit = digitRegex.test(password);

    if (password === "") {
      setPasswordErr("Please enter Password");
      hasErrors = true;
    } else if (!hasUppercase || !hasLowercase || !hasSpecialChar || !hasDigit) {
      setPasswordErr(
        "Password Contains atleast one Upercase, Lowercase, Special Character and Number"
      );
      hasErrors = true;
    }
    if (confirmPassword === "") {
      setConfirmPasswordErr("Please confirm Password");
      hasErrors = true;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordErr("Passwords does not match");
      hasErrors = true;
    }

    if (!hasErrors) {
      setIsLoading(true);
      let type;
      try {
        await axios
          .post("http://localhost:4000/api/user/emailType", { email: email })
          .then((res) => {
            type = res.data;
          });

        await axios
          .post("http://localhost:4000/api/user/resetPassword", {
            email: email,
            password: password,
            type: type,
          })
          .then((res) => {
            setIsLoading(false);
            toast.success("Password update successfuly");
            setTimeout(()=> {
              navigate("/Login")
            },5000)
          });
      } catch (err) {
        toast.error(err);
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div class="min-h-screen flex items-start justify-center bg-gray-100">
        <div class="max-w-md w-full px-6 py-8 mt-10 bg-white shadow-md">
          <h2 class="text-2xl font-semibold mb-4">Reset Password</h2>
          <p class="text-gray-600 mb-6">
            Please enter your new password and confirm password.
          </p>
          <form>
            <div class="mb-4">
              <label
                for="password"
                class="block text-gray-700 text-sm font-bold mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="New Password"
                required
                class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {passwordErr && (
                <p
                  style={{
                    marginTop: "-8px",
                    marginLeft: "15px",
                    fontSize: "14px",
                    color: "#d32f2f",
                  }}
                >
                  {passwordErr}
                </p>
              )}
            </div>
            <div class="mb-4">
              <label
                for="confirmPassword"
                class="block text-gray-700 text-sm font-bold mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
              {confirmPasswordErr && (
                <p
                  style={{
                    marginTop: "-8px",
                    marginLeft: "15px",
                    fontSize: "14px",
                    color: "#d32f2f",
                  }}
                >
                  {confirmPasswordErr}
                </p>
              )}
            </div>
            <div class="flex items-center justify-center">
              {isLoading ? (
                <CircularProgress />
              ) : (
                <button
                  style={{ backgroundColor: "#FFCC00" }}
                  type="submit"
                  class="text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={resetPassword}
                >
                  Reset Password
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
