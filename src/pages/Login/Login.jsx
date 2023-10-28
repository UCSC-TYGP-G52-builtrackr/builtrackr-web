import { Link, Navigate, useNavigate } from "react-router-dom";
import { React, useState } from "react";
import { Validation } from "./validation";
import { ToastContainer, toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { encryptData } from "../../encrypt";

// import { encryptData } from "../../encrypt";
export function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  function handleInput(event) {
    const newObj = { ...values, [event.target.name]: event.target.value };
    setValues(newObj);
  }
  const [isLoading, setIsLoading] = useState(false);
  async function handleValidation(event) {
    console.log("Hell");
    event.preventDefault();
    setErrors({});
    const error = Validation(values);
    setErrors(error);
    if (error.email !== "" || error.password !== "") {
      return;
    } else {
      setIsLoading(true);
      console.log("Hello");
      try {
        await axios
          .post("http://localhost:4000/api/user/auth", values)
          .then((res) => {
            if (res.data.type === 0) {
              localStorage.setItem(
                "user_type",
                JSON.stringify(encryptData(res.data.type.toString()))
              );
              localStorage.setItem(
                "name",
                JSON.stringify(encryptData(res.data.name))
              );
              localStorage.setItem(
                "company_id",
                JSON.stringify(encryptData(res.data.id.toString()))
              );
              localStorage.setItem(
                "home_page",
                JSON.stringify(encryptData("admin/dashboard"))
              );
              localStorage.setItem(
                "is_loged",
                JSON.stringify(encryptData("yes"))
              );
              setIsLoading(false);
              navigate("/admin/dashboard");
            } else {
              localStorage.setItem(
                "user_type",
                JSON.stringify(encryptData(res.data.type.toString()))
              );
              localStorage.setItem(
                "photo",
                JSON.stringify(encryptData(res.data.type.toString()))
              );
              localStorage.setItem(
                "name",
                JSON.stringify(encryptData(res.data.name))
              );
              localStorage.setItem(
                "company_id",
                JSON.stringify(encryptData(res.data.company_id.toString()))
              );
              localStorage.setItem(
                "no",
                JSON.stringify(encryptData(res.data.employee_id.toString()))
              );
              localStorage.setItem(
                "is_loged",
                JSON.stringify(encryptData("yes"))
              );
              localStorage.setItem(
                "role_name",
                JSON.stringify(encryptData(res.data.role_name))
              );
              console.log(res.data);
              setIsLoading(false);
              if (res.data.type === 1) {
                localStorage.setItem(
                  "home_page",
                  JSON.stringify(encryptData("hrmanager/user roles"))
                );
                navigate("/hrmanager/user roles");
              } else if (res.data.type === 2) {
                localStorage.setItem(
                  "home_page",
                  JSON.stringify(encryptData("/inventorymanager/Dashboard"))
                );
                navigate("/inventorymanager/Dashboard");
              } else if (res.data.type === 3) {
                localStorage.setItem(
                  "home_page",
                  JSON.stringify(encryptData("chiefEngineer/sites"))
                );
                navigate("/chiefEngineer/sites");
              } else if (res.data.type === 4) {
                localStorage.setItem(
                  "home_page",
                  JSON.stringify(encryptData("sitemanager/dashboard"))
                );
                navigate("/sitemanager/dashboard");
              } else if (res.data.type === 5) {
                localStorage.setItem(
                  "home_page",
                  JSON.stringify(encryptData("Supervisor/KanbanBoard"))
                );
                navigate("/Supervisor/KanbanBoard");
              }
            }
          });
      } catch (err) {
        setIsLoading(false);
        console.log(err);
        toast.error(err.response.data.error);
      }
    }
  }
  return (
    <div className="grid-container">
      <ToastContainer />
      <div className="form_body">
        {/* left side grid image */}
        <div className="grid_left" style={{ marginTop: "5%" }}>
          <form>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
              Login To
            </h1>
            <h2
              className="text-4xl font-extrabold dark:text-black"
              style={{ color: "#ffcc00", marginBottom: "5%" }}
            >
              BuilTrackr
            </h2>
            <span>
              If you don't have an account you can{" "}
              <Link to="/Register">
                <b>Register Here !</b>
              </Link>
            </span>
            <br />
            <img className="image_1" src="../login.jpg" alt="image_1" />
          </form>
        </div>

        {/*right side grid form */}
        <div className="grid_right">
          <form className="register_form" onSubmit={handleValidation}>
            <h2
              className="text-4xl font-extrabold dark:text-black"
              style={{ marginBottom: "6%" }}
            >
              Log In
            </h2>

            <div className="form-info">
              <label>User Name</label>
              <input
                type="email"
                placeholder=" name@email.com"
                name="email"
                id="email"
                value={values.email}
                onChange={handleInput}
                style={{ paddingLeft: "10px" }}
              ></input>
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
              <label>Password</label>
              <input
                type="password"
                placeholder=" Enter Your Password"
                name="password"
                id="password"
                value={values.password}
                onChange={handleInput}
                style={{ paddingLeft: "10px" }}
              ></input>
              <br />
              {errors.password && (
                <p style={{ color: "red" }}>{errors.password}</p>
              )}
              <br />
              <a href="forgotPassword">Forgot Password?</a> <br />
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
                <button
                  className="next_button"
                  type="submit"
                  style={{
                    backgroundColor: "#ffcc00",
                    marginTop: "10px",
                    fontWeight: "700",
                  }}
                >
                  {" "}
                  Login
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
