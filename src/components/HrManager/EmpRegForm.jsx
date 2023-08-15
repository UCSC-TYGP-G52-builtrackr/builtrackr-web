import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import { decryptData } from "../../encrypt";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nicRegex1 = /^[2-9]+[0-9]{8}[vVxX]$/;
const nicRegex2 = /^[1-2]+[0-9]{11}$/;
const phoneRegex = /^[0]+[0-9]{9}$/;

const EmpRegForm = ({ employeeAddForm, setemployeeAddForm }) => {
  const style = {
    position: "absolute",
    marginLeft: "150px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    p: 4,
  };

  const company_id = parseInt(
    decryptData(JSON.parse(localStorage.getItem("company_id")))
  );

  const [fName, setFName] = useState("");
  const [fNameErr, setFNameErr] = useState("");

  const [lName, setLName] = useState("");
  const [lNameErr, setLNameErr] = useState("");

  const [dob, setDob] = useState({});

  const [address, setAddress] = useState("");
  const [addressErr, setAddressErr] = useState("");

  const [address2, setAddress2] = useState("");
  const [address2Err, setAddress2Err] = useState("");

  const [city, setCity] = useState("");
  const [cityErr, setCityErr] = useState("");

  const [id, setId] = useState("");
  const [idErr, setIdErr] = useState("");

  const [phone, setPhone] = useState("");
  const [phoneErr, setPhoneErr] = useState("");

  const [registerDate, setRegisterDate] = useState({});

  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const [nic, setNic] = useState("");
  const [nicErr, setNicErr] = useState("");

  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");

  const [employeeTypeErr, setEmployeeTypeErr] = useState("");
  const [employeeTypeValue, setEmployeeTypeValue] = useState(0);
  const selcetEmployeTypeChange = (e) => {
    setEmployeeTypeValue(e.target.value);
    setSelectEmployeeType(true);
  };

  const [selcetEmployeeType, setSelectEmployeeType] = useState(false);

  const closeForm = () => {
    setemployeeAddForm(false);
    setFName("");
    setFNameErr("");
    setLName("");
    setLNameErr("");
    setNic("");
    setNicErr("");
    setPhone("");
    setPhoneErr("");
    setId("");
    setIdErr("");
    setEmail("");
    setEmailErr("");
    setAddress("");
    setAddressErr("");
    setAddress2("");
    setAddress2Err("");
    setCity("");
    setCityErr("");
    setPassword("");
    setPasswordErr("");
    setConfirmPassword("");
    setConfirmPasswordErr("");
    setEmployeeTypeValue(0);
    setEmployeeTypeErr("");
    setSelectEmployeeType(false);
  };

  const [userRoles, setUserRoles] = useState([]);

  const [confirmModal, setConfirmModal] = useState(false);
  const openConfirmModal = () => {
    setConfirmModal(true);
  };
  const closeConfirmModal = () => {
    setConfirmModal(false);
  };

  useEffect(() => {
    const viewUserRoles = async () => {
      try {
        const data = await fetch(
          "http://localhost:4000/api/user/getUserRoles",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: company_id }),
          }
        );
        if (data.status === 200) {
          const jsonData = await data.json();
          setUserRoles(jsonData);
        } else {
          console.log(data.status);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    viewUserRoles();
  }, [employeeAddForm]);

  const handelSubmitEmployyeAdd = async (e) => {
    e.preventDefault();
    let hasErrors = false;

    setFNameErr("");
    setLNameErr("");
    setEmailErr("");
    setNicErr("");
    setIdErr("");
    setPhoneErr("");
    setAddressErr("");
    setAddress2Err("");
    setCityErr("");
    setPasswordErr("");
    setConfirmPasswordErr("");

    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const specialCharRegex = /[!@#$%^&*()\-_=+[{\]}|;:,<.>/?]/;
    const digitRegex = /\d/;

    const hasUppercase = uppercaseRegex.test(password);
    const hasLowercase = lowercaseRegex.test(password);
    const hasSpecialChar = specialCharRegex.test(password);
    const hasDigit = digitRegex.test(password);

    if (fName.length === 0) {
      setFNameErr("Enter Employee First Name");
      hasErrors = true;
    }
    if (lName.length === 0) {
      setLNameErr("Enter Employee last Name");
      hasErrors = true;
    }
    if (email.length === 0) {
      setEmailErr("Enter email");
      hasErrors = true;
    } else if (!emailRegex.test(email)) {
      setEmailErr("Invalid email type");
      hasErrors = true;
    }
    if (nic.length === 0) {
      setNicErr("Enter NIC no");
      hasErrors = true;
    } else if (nic.length !== 10 && nic.length !== 12) {
      setNicErr("Invalid Nic no1");
      hasErrors = true;
    } else if (!nicRegex1.test(nic) && !nicRegex2.test(nic)) {
      setNicErr("Invalid Nic no2");
      hasErrors = true;
    }
    if (id.length === 0) {
      setIdErr("Enter employee Id");
      hasErrors = true;
    }
    if (phone.length === 0) {
      setPhoneErr("Enter mobile number");
      hasErrors = true;
    } else if (!phoneRegex.test(phone)) {
      setPhoneErr("Invalid mobile number");
      hasErrors = true;
    }
    if (address.length === 0) {
      setAddressErr("Enter address");
      hasErrors = true;
    }
    if (address2.length === 0) {
      setAddress2Err("Enter address");
      hasErrors = true;
    }
    if (city.length === 0) {
      setCityErr("Enter city");
      hasErrors = true;
    }
    if (password.length === 0) {
      setPasswordErr("Enter password");
      hasErrors = true;
    } else if (password.length < 8) {
      setPasswordErr("Password Contains atleast 8 Characters");
      hasErrors = true;
    } else if (!hasUppercase || !hasLowercase || !hasSpecialChar || !hasDigit) {
      setPasswordErr(
        "Password Contains atleast one Upercase, Lowercase, Special Character and Number"
      );
      hasErrors = true;
    }
    if (confirmPassword.length === 0) {
      setConfirmPasswordErr("Confirm password");
      hasErrors = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordErr("Passowrds not matched");
    }
    if (employeeTypeValue === 0) {
      setEmployeeTypeErr("Select Employee Type");
      hasErrors = true;
    }

    if (hasErrors) {
      setConfirmModal(false);
      return;
    } else {
      if (employeeTypeValue !== 6) {
        const formData = {
          fName: fName,
          lName: lName,
          nic: nic,
          phone: phone,
          id: id,
          email: email,
          dob: dob,
          registerDate: registerDate,
          address: address,
          password: password,
          company_id: company_id,
          type: employeeTypeValue,
        };
        let emailErr = false;

        try {
          await axios
            .post("http://localhost:4000/api/employee/employeeExists", formData)
            .then((res) => {
              if (res.data.status) {
                emailErr = true;
                toast.error("Email Already exist");
                setConfirmModal(false);
                return;
              }
            });
        } catch (err) {
          toast.error(err.response.data.error);
          return;
        }
        if (!emailErr) {
          try {
            const data = await fetch(
              "http://localhost:4000/api/employee/registerEmployee",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
              }
            );

            if (data.status === 200) {
              const jsonData = await data.json();
              toast.success(`employee registerd successfuly`);
            }
          } catch (err) {
            console.error(err.message);
          }
          setConfirmModal(false);
          closeForm();
        }
      } else {
        // labourer add part handel inside that block
      }
    }
  };

  return (
    <div>
      <div className="employye-add-form">
        <Modal
          open={employeeAddForm}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} style={{ width: "550px" }}>
            <h2
              style={{
                textAlign: "center",
                marginBottom: "20px",
                fontWeight: "bold",
              }}
            >
              Add employee details
            </h2>
            <form>
              <InputLabel htmlFor="name" style={{ marginTop: "15px" }}>
                Select Employee Type
              </InputLabel>
              <Select
                // labelId="demo-simple-select-label"
                name="name"
                id=""
                value={employeeTypeValue}
                label="Age"
                onChange={selcetEmployeTypeChange}
                style={
                  {
                    // marginTop:'20px'
                  }
                }
                size="small"
                sx={{ width: "100%", marginBottom: "20px" }}
                error={employeeTypeErr !== "" && true}
              >
                {userRoles.map((el) => (
                  <MenuItem value={el.type}>{el.role_name}</MenuItem>
                ))}
                <MenuItem value={6}>Labourers</MenuItem>
              </Select>
              {employeeTypeErr && (
                <FormHelperText
                  style={{ color: "#d32f2f", marginLeft: "15px" }}
                >
                  {employeeTypeErr}
                </FormHelperText>
              )}
              {selcetEmployeeType && (
                <>
                  <div className="two-inputs">
                    <TextField
                      error={fNameErr !== "" && true}
                      className="outlined-basic"
                      label="First Name"
                      variant="outlined"
                      size="small"
                      sx={{ width: "50%" }}
                      value={fName}
                      onChange={(e) => setFName(e.target.value)}
                      helperText={fNameErr !== "" && fNameErr}
                    />
                    <TextField
                      error={lNameErr !== "" && true}
                      className="outlined-basic"
                      label="Last Name"
                      variant="outlined"
                      size="small"
                      sx={{ width: "50%" }}
                      value={lName}
                      onChange={(e) => setLName(e.target.value)}
                      helperText={lNameErr !== "" && lNameErr}
                    />
                  </div>
                  <div className="two-inputs">
                    <TextField
                      className="outlined-basic"
                      label="NIC"
                      variant="outlined"
                      size="small"
                      sx={{ width: "50%" }}
                      value={nic}
                      onChange={(e) => setNic(e.target.value)}
                      error={nicErr !== "" && true}
                      helperText={nicErr !== "" && nicErr}
                    />
                    <TextField
                      className="outlined-basic"
                      label="Contact No"
                      variant="outlined"
                      size="small"
                      sx={{ width: "50%" }}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      error={phoneErr !== "" && true}
                      helperText={phoneErr !== "" && phoneErr}
                    />
                  </div>
                  <div className="two-inputs">
                    <TextField
                      className="outlined-basic"
                      label="Employee Id"
                      variant="outlined"
                      size="small"
                      sx={{ width: "50%" }}
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                      error={idErr !== "" && true}
                      helperText={idErr !== "" && idErr}
                    />
                    <TextField
                      className="outlined-basic"
                      label="Email"
                      variant="outlined"
                      size="small"
                      sx={{ width: "50%" }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      error={emailErr !== "" && true}
                      helperText={emailErr !== "" && emailErr}
                    />
                  </div>
                  <div className="two">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker", "DatePicker"]}>
                        <DatePicker
                          label="Date of Birth"
                          slotProps={{ textField: { size: "small" } }}
                          value={dob}
                          onChange={(newValue) => setDob(newValue)}
                          disableFuture
                        />
                        <DatePicker
                          label="Registered Date"
                          slotProps={{ textField: { size: "small" } }}
                          value={registerDate}
                          onChange={(newValue) => setRegisterDate(newValue)}
                          disableFuture
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>

                  <TextField
                    className="outlined-basic"
                    label="Address"
                    variant="outlined"
                    size="small"
                    style={{ margin: "20px 0" }}
                    sx={{ width: "100%" }}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    error={addressErr !== "" && true}
                    helperText={addressErr !== "" && addressErr}
                  />
                   {/* <TextField
                    className="outlined-basic"
                    label="Address line 2"
                    variant="outlined"
                    size="small"
                    style={{ margin: "20px 0" }}
                    sx={{ width: "100%" }}
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    error={address2Err !== "" && true}
                    helperText={address2Err !== "" && address2Err}
                  />
                  
                  <TextField
                    className="outlined-basic"
                    label="Cty"
                    variant="outlined"
                    size="small"
                    style={{ margin: "20px 0" }}
                    sx={{ width: "100%" }}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    error={cityErr !== "" && true}
                    helperText={cityErr !== "" && cityErr}
                  /> */}
                  {employeeTypeValue !== 6 && (
                    <div className="two-inputs">
                      <TextField
                        className="outlined-basic"
                        label="Paasowrd"
                        variant="outlined"
                        size="small"
                        sx={{ width: "50%" }}
                        type={"password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={passwordErr !== "" && true}
                        helperText={passwordErr !== "" && passwordErr}
                      />
                      <TextField
                        className="outlined-basic"
                        label="Password Confirm"
                        variant="outlined"
                        size="small"
                        sx={{ width: "50%" }}
                        type={"password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={confirmPasswordErr !== "" && true}
                        helperText={
                          confirmPasswordErr !== "" && confirmPasswordErr
                        }
                      />
                    </div>
                  )}
                </>
              )}
              <div className="two-btns">
                <Buttons
                  type={"button"}
                  color={"red"}
                  text={"Cancel"}
                  onClick={closeForm}
                />
                <Buttons
                  type={"button"}
                  color={"green"}
                  text={"Create"}
                  onClick={openConfirmModal}
                />
              </div>
            </form>
          </Box>
        </Modal>
      </div>
      <ConfirmationdModal
        confirmModal={confirmModal}
        text={`Are you sure want add ${fName} as Employee?`}
        closeConfirmationModal={closeConfirmModal}
        submit={handelSubmitEmployyeAdd}
      />
    </div>
  );
};
function Buttons({ type, color, text, onClick }) {
  return (
    <button
      type={type}
      style={{ backgroundColor: color }}
      className="normal-btn"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

function ConfirmationdModal({
  confirmModal,
  text,
  closeConfirmationModal,
  submit,
}) {
  const style = {
    position: "absolute",
    marginLeft: "150px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    p: 4,
  };
  return (
    <>
      <div className="confirmation-modal">
        <Modal
          open={confirmModal}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={style}>
            <h1
              style={{
                textAlign: "center",
                fontSizeAdjust: "16px",
                fontWeight: "600",
              }}
              id="child-modal-description"
            >
              {text}{" "}
            </h1>
            <div className="two-btns">
              <Buttons
                type={"button"}
                color={"red"}
                text={"Cancel"}
                onClick={closeConfirmationModal}
              />
              <Buttons
                type={"button"}
                color={"green"}
                text={"Create"}
                onClick={submit}
              />
            </div>
            {/* <Button onClick={handleClose}>Close Child Modal</Button> */}
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default EmpRegForm;
