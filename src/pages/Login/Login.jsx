import { Link } from "react-router-dom";
import { React, useState } from "react";
import { Validation } from "./validation";

export function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  function handleInput(event) {
    const newObj = { ...values, [event.target.name]: event.target.value };
    setValues(newObj);
  }

  function handleValidation(event) {
    console.log(values);
    event.preventDefault();
    setErrors(Validation(values));
    console.log(errors);
  }
  return (
    <div className="grid-container">
      <div className="form_body">
        {/* left side grid image */}
        <div className="grid_left">
          <form>
            <h1>Login To</h1>
            <h2>Builtrackr</h2>
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
            <h1>Sign In</h1>
            <div className="form-info">
              <label>User Name</label>
              <input
                type="email"
                placeholder=" email@gmail.com"
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
