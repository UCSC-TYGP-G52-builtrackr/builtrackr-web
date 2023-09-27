export function Validation(values) {
  const errors = {
    email: "",
    password: "",
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^s@]{2,6}$/;

  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
  if (values.email === "") {
    errors.email = "Email is Required";
  } else if (!emailPattern.test(values.email)) {
    errors.email = "Email doesn't in correct order";
  }

  if (values.password === "") {
    errors.password = "Password is required";
  } else if (passwordPattern.test(values.password)) {
    errors.password = "Password is not in format";
  }

  console.log(errors);
  return errors;
}
