import { Link, Navigate, useNavigate } from "react-router-dom";
import { React, useState } from "react";
import { Validation } from "./validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { alignProperty } from "@mui/material/styles/cssUtils";

export function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [name, setName] = useState("Nilshan");
  const [errors, setErrors] = useState({});
  function handleInput(event) {
    const newObj = { ...values, [event.target.name]: event.target.value };
    setValues(newObj);
  }

  async function handleValidation(event) {
    console.log(values);
    event.preventDefault();
    setErrors(Validation(values));
    console.log(errors);
    const type = "Employe";
    if (Object.keys(errors).length > 0) {
      return;
    } else {
      if (type === "Employee") {
        console.log("ok1");

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
              JSON.stringify(jsonData.type.toString())
            );
            localStorage.setItem("name", JSON.stringify(jsonData.name));
            localStorage.setItem(
              "company_id",
              JSON.stringify(jsonData.company_id.toString())
            );
            localStorage.setItem(
              "no",
              JSON.stringify(jsonData.employee_id.toString())
            );

            if (jsonData.type === 1) {
              localStorage.setItem("home_page", JSON.stringify("admin"));
              setName(jsonData.name);
              navigate("/admin");
              toast.success("Login Successfull");
            } else if (jsonData.type === 4) {
              localStorage.setItem(
                "home_page",
                JSON.stringify("sitemanager/dashboard")
              );
              setName(jsonData.name);
              navigate("/sitemanager/dashboard", {
                state: { name: jsonData.name },
              });
              toast.success("Login Successfull");
            }
          }
        } catch (err) {
          console.error(err.message);
        }
      } else {
        console.log("Ok2");
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
                  JSON.stringify(adminType.toString())
                );
                localStorage.setItem("name", JSON.stringify(res.data.name));
                localStorage.setItem(
                  "company_id",
                  JSON.stringify(res.data.id.toString())
                );
                localStorage.setItem("home_page", JSON.stringify("Admin"));

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
