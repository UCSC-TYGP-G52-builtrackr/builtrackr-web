import { Link, Navigate, useNavigate } from "react-router-dom";
import { React, useState } from "react";
import { Validation } from "./validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { alignProperty } from "@mui/material/styles/cssUtils";
import {encryptData } from '../../encrypt'
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
    const error = Validation(values);
    setErrors(error);
    console.log(errors);
    if (!error) {
      console.log(error)
      return;

    } else {
      if (values.type === "Employee") {
        try {
          const data = await fetch(
            "http://localhost:4000/api/employee/loginEmployee",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
              body: JSON.stringify({
                email: values.email,
                password: values.password,
              }),
            }
          );
          console.log(data);
          if (data.status === 201) {
            const jsonData = await data.json();
            console.log(jsonData);

            localStorage.setItem(
              "user_type",
              JSON.stringify(encryptData(jsonData.type.toString()))
            );
            localStorage.setItem("name", JSON.stringify(encryptData(jsonData.name)));
            localStorage.setItem(
              "company_id",
              JSON.stringify(encryptData(jsonData.company_id.toString()))
            );
            localStorage.setItem(
              "no",
              JSON.stringify(encryptData(jsonData.employee_id.toString()))
            );
            localStorage.setItem("is_loged", JSON.stringify(encryptData("yes")));


            if (jsonData.type === 1) {
              localStorage.setItem("home_page", JSON.stringify(encryptData("Admin")));
              navigate("/admin");
              toast.success("Login Successfull");
            } else if (jsonData.type === 4) {
              localStorage.setItem(
                "home_page",
                JSON.stringify(encryptData("sitemanager/dashboard"))
              );
              navigate("/sitemanager/dashboard");
              toast.success("Login Successfull");
            }else if (jsonData.type === 5) {
              localStorage.setItem(
                "home_page",
                JSON.stringify(encryptData("Supervisor/KanbanBoard"))
              );
              navigate("/Supervisor/KanbanBoard");
              toast.success("Login Successfull");
            }
          }
        } catch (err) {
          console.error(err.message);
        }
      } else {
        try {
          await axios
            .post("http://localhost:4000/api/user/auth", values)
            .then((res) => {
              if (res.status === 201) {
                const adminType = 0;
                console.log(res.data.name);
                toast.success("Login Successfull");
                localStorage.setItem(
                  "user_type",
                  JSON.stringify(encryptData(adminType.toString()))
                );
                localStorage.setItem("name", JSON.stringify(encryptData(res.data.name)));
                localStorage.setItem(
                  "company_id",
                  JSON.stringify(encryptData(res.data.id.toString()))
                );
                localStorage.setItem("home_page", JSON.stringify(encryptData("Admin")));
                localStorage.setItem("is_loged", JSON.stringify(encryptData("yes")));


                setTimeout(() => {
                  navigate("/admin");
                }, 2000);
              } else {
                toast.error("Login Failed");
              }
            });
          // navigate('/home')
        } catch (err) {
          console.log(err); // "Request failed with status code 500"
          toast.error(err.response.data.message);
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
              ></input>
              <br />
              {errors.password && (
                <p style={{ color: "red" }}>{errors.password}</p>
              )}
              <label>Login As</label>
              <select
                className="login-type-select"
                value={values.type}
                onChange={handleInput}
                name="type"
              >
                <option className="login-option" value="" disabled>
                  Selecet Login Type
                </option>
                <option className="login-option" value="Employee">
                  Employee
                </option>
                <option className="login-option" value="Admin">
                  Admin
                </option>
              </select>
              {errors.type && <p style={{ color: "red" }}>{errors.type}</p>}
              <br />
              <a href="forgotPassword">Forgot Password?</a> <br />
              <button className="next_button" type="submit">
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
