import { Link, Navigate, useNavigate } from "react-router-dom";
import { React, useState } from "react";
import { Validation } from "./validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { encryptData } from "../../encrypt";
export function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    type: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  function handleInput(event) {
    const newObj = { ...values, [event.target.name]: event.target.value };
    setValues(newObj);
  }
  console.log(values.type);
  async function handleValidation(event) {
    event.preventDefault();
    setErrors({})
    const error = Validation(values);
    console.log(error);
    setErrors(error)
    console.log(errors);
    if (!errors) {
      console.log(error);
      return;
    } else {
      if (values.type === "Employee") {
        try {
          await axios
            .post("http://localhost:4000/api/employee/loginEmployee", values)
            .then((res) => {
              toast.success("Login Successfull");
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

              if (res.data.type === 1) {
                localStorage.setItem(
                  "home_page",
                  JSON.stringify(encryptData("hrmanager/user roles"))
                );
                setTimeout(() => {
                  navigate("/hrmanager/user roles");
                }, 2000);
              } else if (res.data.type === 2) {
                localStorage.setItem(
                  "home_page",
                  JSON.stringify(encryptData("inventorymanager/dashboard"))
                );
                setTimeout(() => {
                  navigate("/inventorymanager/dashboard");
                }, 2000);
              } else if (res.data.type === 3) {
                localStorage.setItem(
                  "home_page",
                  JSON.stringify(encryptData("chiefEngineer/sites"))
                );
                setTimeout(() => {
                  navigate("/chiefEngineer/sites");
                }, 2000);
              } else if (res.data.type === 4) {
                localStorage.setItem(
                  "home_page",
                  JSON.stringify(encryptData("sitemanager/dashboard"))
                );
                setTimeout(() => {
                  navigate("/sitemanager/dashboard");
                }, 2000);
              } else if (res.data.type === 5) {
                localStorage.setItem(
                  "home_page",
                  JSON.stringify(encryptData("Supervisor/KanbanBoard"))
                );
                setTimeout(() => {
                  navigate("/Supervisor/KanbanBoard");
                }, 2000);
              }
            });
        } catch (err) {
          console.log(err);
          toast.error(err.response.data.error);
        }

      } else if(values.type === "Admin") {
        try {
          await axios
            .post("http://localhost:4000/api/user/auth", values)
            .then((res) => {
              const adminType = 0;
              console.log(res);
              toast.success("Login Successfull");
              localStorage.setItem(
                "user_type",
                JSON.stringify(encryptData(adminType.toString()))
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
                JSON.stringify(encryptData("Admin"))
              );
              localStorage.setItem(
                "is_loged",
                JSON.stringify(encryptData("yes"))
              );

              setTimeout(() => {
                navigate("/admin");
              }, 2000);
            });
        } catch (err) {
          console.log(err);
          toast.error(err.response.data.error);
        }
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
              <label>Role</label>
              <select
                className="login-type-select"
                value={values.type}
                onChange={handleInput}
                name="type"
              >
                <option className="login-option" value="" disabled>
                  Select Login Type
                </option>
                <option className="login-option" value="Employee">
                  Employee
                </option>
                <option className="login-option" value="Admin">
                  Admin
                </option>
              </select>
              {errors.typeErr && <p style={{ color: "red" }}>{errors.typeErr}</p>}
              <br />
              <a href="forgotPassword">Forgot Password?</a> <br />
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
