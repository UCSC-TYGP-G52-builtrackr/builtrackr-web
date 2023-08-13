export function Validation(values) {
  console.log(values);
  const errors = {};

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
  if (
    values.regNo === "" ||
    values.companyName === "" ||
    values.line1 === "" ||
    values.contactNo === ""
    
  ) {
    errors.input = "Field is required";
  }
  if(values.type === "" ){
    errors.type = "Select login type"
  }
  if (values.password !== values.cPassword) {
    errors.confirm = "Password Didn't Match";
  }
  return errors;
}
