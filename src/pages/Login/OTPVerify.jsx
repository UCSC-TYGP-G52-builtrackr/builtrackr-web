/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const OTPVerify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state;

  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [otp, setotp] = useState(0);
  const [otpErr, setOtpErr] = useState("");
  const { email, OTP } = formData;
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(intervalId);
        setotp(0);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId); // Cleanup when the component unmounts
    };
  }, [seconds]);

  useEffect(() => {
    setotp(OTP);
  }, []);

  if (!formData) {
    return <div>No form data found.</div>;
  }

  const verfiyOTP = () => {
    setOtpErr("");
    if (parseInt(OTPinput.join("")) === otp) {
      navigate("/resetPassword", { state: { email: email } });
    } else {
      setOtpErr("OTP does not match");
    }
  };

  const resendOTP = async () => {
    const OTPS = Math.floor(Math.random() * 9000 + 1000);
    setotp(OTPS);
    try {
      await axios
        .post("http://localhost:4000/api/user/sendResetOTP", {
          email: email,
          OTP: OTPS,
        })
        .then((res) => {
          setSeconds(60);
        });
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
        <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email {email}</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>Enter OTP here within one miniute</p>
              </div>
            </div>

            <div>
              <form>
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    <div className="w-16 h-16 ">
                      <input
                        maxLength="1"
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name=""
                        id=""
                        onChange={(e) =>
                          setOTPinput([
                            e.target.value,
                            OTPinput[1],
                            OTPinput[2],
                            OTPinput[3],
                          ])
                        }
                      ></input>
                    </div>
                    <div className="w-16 h-16 ">
                      <input
                        maxLength="1"
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name=""
                        id=""
                        onChange={(e) =>
                          setOTPinput([
                            OTPinput[0],
                            e.target.value,
                            OTPinput[2],
                            OTPinput[3],
                          ])
                        }
                      ></input>
                    </div>
                    <div className="w-16 h-16 ">
                      <input
                        maxLength="1"
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name=""
                        id=""
                        onChange={(e) =>
                          setOTPinput([
                            OTPinput[0],
                            OTPinput[1],
                            e.target.value,
                            OTPinput[3],
                          ])
                        }
                      ></input>
                    </div>
                    <div className="w-16 h-16 ">
                      <input
                        maxLength="1"
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name=""
                        id=""
                        onChange={(e) =>
                          setOTPinput([
                            OTPinput[0],
                            OTPinput[1],
                            OTPinput[2],
                            e.target.value,
                          ])
                        }
                      ></input>
                    </div>
                  </div>
                  {parseInt(OTPinput.join("")) === otp ? (
                    <p
                      style={{
                        textAlign: "center",
                        color: "green",
                        fontSize: "18px",
                      }}
                    >
                      {otpErr}
                    </p>
                  ) : (
                    <p
                      style={{
                        textAlign: "center",
                        color: "#d32f2f",
                        fontSize: "18px",
                      }}
                    >
                      {otpErr}
                    </p>
                  )}
                  {otpErr && (
                    <p
                      style={{
                        textAlign: "center",
                        color: "#d32f2f",
                        fontSize: "14px",
                      }}
                    >
                      {otpErr}
                    </p>
                  )}

                  <div className="flex flex-col space-y-5">
                    <div>
                      <a
                        style={{ backgroundColor: "#ffcc00" }}
                        onClick={verfiyOTP}
                        className="flex flex-row cursor-pointer items-center justify-center text-center w-full border rounded-xl outline-none py-5 border-none text-white text-m shadow-sm"
                      >
                        Verify Account
                      </a>
                    </div>

                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't recieve code?</p>{" "}
                      <a
                        className="flex flex-row items-center"
                        style={{
                          color: seconds > 0 ? "gray" : "blue",
                          cursor: seconds > 0 ? "none" : "pointer",
                          textDecorationLine:
                            seconds > 0 ? "none" : "underline",
                        }}
                        onClick={seconds > 0 ? null : resendOTP}
                      >
                        {seconds > 0
                          ? `Resend OTP in ${seconds}s`
                          : "Resend OTP"}
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTPVerify;
