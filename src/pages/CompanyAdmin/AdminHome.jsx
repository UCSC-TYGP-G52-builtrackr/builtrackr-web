import react from "react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/tmpSiteManager/Navbar";
import SideBar from "./Components/SideBar";
import { useStateContext } from "../../contexts/ContextProvider";
import { BsChatDots } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { Snackbar, Alert } from "@mui/material";
import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";
import "./adminHome.css";
import { imageListClasses } from "@mui/material";

const list1 = [
  "Create Tasks",
  "Decline Tasks",
  "Acept Tasks",
  "Decline Tasks",
  "Assign Labourars to Tasks",
  "Review Task",
];

const list2 = [
  "Create Sites",
  "Add Site Engineers",
  "Add documents",
  "Review Tasks",
  "View Inventory Request",
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nicRegex1 = /^[1]+[0-9]{8}[vVxX]$/;
const nicRegex2 = /^[1-2]+[0-9]{11}$/;
const phoneRegex = /^[0]+[0-9]{9}$/;

// const privileges = [
//   "Create user Profile",
//   "Create Siets",
//   "Add Task",
//   "Assign labourars",
//   "Review Task",
//   "Decline Task",
//   "Remove Tasks",
//   "Upload Documents",
//   "Request Inventory",
// ];

const AdminHome = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  const [displayForm, setDisplayForm] = useState(false);
  const [selectedPrivileges, setSelectedPrivileges] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [emplyeeAddForm, setEmployeeAddForm] = useState(false);

  const handleOpenEmployeeForm = () => setEmployeeAddForm(true);
  const handleCloseEmployeeForm = () => {
    setEmployeeAddForm(false);
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
    setPassword("");
    setPasswordErr("");
    SetConfirmPassword("");
    SetConfirmPasswordErr("");
    setDob("");
    setDobErr("");
    setRegisterDate("");
    setRegisterDateErr("");
  };
  const idToSend = 1;

  // User role add
  const [roleImage, setRoleImage] = useState("");
  const [roleImageErr, setRoleImageErr] = useState("");

  const [roleName, setRoleName] = useState("");
  const [roleNameErr, setRoleNameErr] = useState("");

  const [selectedList, setSelectedList] = useState(0);

  const selectPrivilegeList = (no) => {
    setSelectedList(no);
  };

  // Empolyee add from
  const [fName, setFName] = useState("");
  const [fNameErr, setFNameErr] = useState("");

  const [lName, setLName] = useState("");
  const [lNameErr, setLNameErr] = useState("");

  const [dob, setDob] = useState({});
  const [dobErr, setDobErr] = useState({});

  const [address, setAddress] = useState("");
  const [addressErr, setAddressErr] = useState("");

  const [id, setId] = useState("");
  const [idErr, setIdErr] = useState("");

  const [phone, setPhone] = useState("");
  const [phoneErr, setPhoneErr] = useState("");

  const [registerDate, setRegisterDate] = useState({});
  const [registerDateErr, setRegisterDateErr] = useState({});

  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const [nic, setNic] = useState("");
  const [nicErr, setNicErr] = useState("");

  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const [confirmPassword, SetConfirmPassword] = useState("");
  const [confirmPasswordErr, SetConfirmPasswordErr] = useState("");

  const [confirmationModal1, setConfirmationModal1] = useState(false);

  const displayConfirmationModal1 = () => {
    setConfirmationModal1(true);
  };
  const closeConfirmationModal1 = () => {
    setConfirmationModal1(false);
  };
  const [confirmationModal2, setConfirmationModal2] = useState(false);

  const displayConfirmationModal2 = () => {
    setConfirmationModal2(true);
  };
  const closeConfirmationModal2 = () => {
    setConfirmationModal2(false);
  };

  const [alertBox, setAlertBox] = useState(false);

  const closeAlertBox = () => {
    setAlertBox(false);
  };

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

  const closeRoleAddForm = () => {
    setDisplayForm(false);
    setSelectedList(0);
    setRoleName("");
    setRoleNameErr("");
    setRoleImage("");
    setRoleImageErr("");
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
            body: JSON.stringify({ id: idToSend }),
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
  }, [displayForm]);

  const handelSubmitRoleAdd = async (e) => {
    e.preventDefault();
    setRoleNameErr("");

    if (roleName === "") {
      setConfirmationModal2(false);
      setRoleNameErr("Enter User Role Name");
      return;
    }
    try {
      const data = await fetch("http://localhost:4000/api/user/addUserRole", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: roleName,
          roles: selectedPrivileges,
        }),
      });

      if (data.status === 200) {
        const jsonData = await data.json();
        console.log(jsonData);
      } else {
        console.log(data.status);
      }
    } catch (err) {
      console.log("3");
      console.error(err.message);
    }
    setDisplayForm(false);
    setSelectedPrivileges([]);
    setRoleName("");
    setRoleImage("");
    setConfirmationModal2(false);
    setRoleNameErr("");
    setRoleImageErr("");
  };

  const handelSubmitEmployyeAdd = async (e) => {
    e.preventDefault();

    setFNameErr("");
    setLNameErr("");
    setEmailErr("");
    setNicErr("");
    setIdErr("");
    setPhoneErr("");
    setAddressErr("");
    setPasswordErr("");
    SetConfirmPasswordErr("");

    if (fName === "") {
      setFNameErr("Enter Employee First Name");
    }
    if (lName === "") {
      setLNameErr("Enter Employee last Name");
    }
    if (email === "") {
      setEmailErr("Enter email");
    } else if (!emailRegex.test(email)) {
      setEmailErr("Invalid email type");
    }
    if (nic === "") {
      setNicErr("Enter NIC no");
    } else if (nic.length !== 10 && nic.length !== 12) {
      setNicErr("Invalid Nic no1");
    } else if (!nicRegex1.test(nic) && !nicRegex2.test(nic)) {
      setNicErr("Invalid Nic no2");
    }
    if (id === "") {
      setIdErr("Enter employee Id");
    }
    if (phone === "") {
      setPhoneErr("Enter mobile number");
    } else if (!phoneRegex.test(phone)) {
      setPhoneErr("Invalis mobile number");
    }
    if (address === "") {
      setAddressErr("Enter address");
    }
    if (password === "") {
      setPasswordErr("Enter password");
    }
    if (confirmPassword === "") {
      SetConfirmPasswordErr("Confirm password");
    } else if (password !== confirmPassword) {
      SetConfirmPasswordErr("Passowrds not matched");
    }
    console.log(lNameErr);
    console.log(fName);

    if (
      fNameErr !== "" ||
      lNameErr !== "" ||
      nicErr !== "" ||
      phoneErr !== "" ||
      idErr !== "" ||
      emailErr !== "" ||
      addressErr !== "" ||
      passwordErr !== "" ||
      confirmPasswordErr !== ""
    ) {
      console.log("Hiiiiiii");
      setConfirmationModal1(false);
      return;
    }
    else {
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
        company_id: 1,
        type: 1,
      };
      console.log("HEellllooo");
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
          console.log(jsonData);
          setAlertBox(true);
        }
      } catch (err) {
        console.error(err.message);
      }
      setConfirmationModal1(false);
      handleCloseEmployeeForm();
    }
  };

  return (
    <>
      <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
        <button
          type="button"
          onClick={() => setThemeSettings(true)}
          style={{ backgroundColor: "yellow-400", borderRadius: "50%" }}
          className="p-3 text-3xl text-white bg-yellow-400 hover:drop-shadow-xl"
        >
          <BsChatDots />
        </button>
      </div>
      {activeMenu ? (
        <div className="fixed bg-white w-72 sidebar dark:bg-secondary-dark-bg ">
          <SideBar />
        </div>
      ) : (
        <div className="w-0 dark:bg-secondary-dark-bg">
          <SideBar />
        </div>
      )}
      <div
        className="fixed w:100%  bg-main-bg dark:bg-main-dark-bg navbar "
        style={{ position: "fixed", right: "0" }}
      >
        <Navbar />
      </div>
      <div
        className={
          activeMenu
            ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen  w-full  "
            : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
        }
      >
        <div
          className="rest"
          style={{
            paddingTop: "100Px",
            marginLeft: "300Px",
            width: "calc(100% - 300px)",
          }}
        >
          {!displayForm && (
            <div className="button">
              <button
                className="add-button"
                onClick={() => setDisplayForm(true)}
              >
                Add user roles
              </button>
            </div>
          )}
          {!displayForm && (
            <div className="user-roles">
              <div className="hr-role">
                <UserRole
                  role={{ photo_path: "HR.jpeg", role_name: "HR Manager" }}
                />
                <span className="link " onClick={handleOpenEmployeeForm}>
                  Click here to add an employee
                </span>
              </div>

              {userRoles.map((element, i) => (
                <UserRole role={element} key={element.role_id} />
              ))}
            </div>
          )}

          {/* {displayForm && ( */}
          <>
            <div className="user-role-create-form">
              <Modal
                open={displayForm}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style} style={{ width: "550px" }}>
                  <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
                    Add user roles
                  </h2>
                  <form>
                    <TextField
                      error={roleNameErr !== "" && true}
                      className="outlined-basic"
                      label="Role Name"
                      variant="outlined"
                      size="small"
                      sx={{ width: "100%", marginBottom: "20px" }}
                      value={roleName}
                      onChange={(e) => setRoleName(e.target.value)}
                      helperText={roleNameErr !== "" && roleNameErr}
                    />
                    <div style={{ display: "flex" }}>
                      <div className="image-button">
                        <input
                          id="file-upload"
                          type="file"
                          hidden
                          onChange={(e) => setRoleImage(e.target.files[0])}
                        />
                        <label htmlFor="file-upload" className="image-upload">
                          {" "}
                          Select Image <InsertPhotoIcon />
                        </label>
                      </div>
                      <span style={{ marginTop: "6px", paddingLeft: "20px" }}>
                        {roleImage.name}
                      </span>
                    </div>

                    <div className="select-privilages-box">
                      <div className="select-privilages">
                        {selectedList === 1 && (
                          <SelectPlivilege
                            privilegesList={list1}
                            click={selectPrivilegeList}
                          />
                        )}
                        {selectedList === 2 && (
                          <SelectPlivilege
                            privilegesList={list2}
                            click={selectPrivilegeList}
                          />
                        )}
                      </div>
                    </div>

                    {selectedList === 0 && (
                      <>
                        <label
                          style={{ marginBottom: "20px", paddingTop: "20px" }}
                        >
                          Select Role Privilege List
                        </label>
                        <div className="all-privileges-set">
                          <PrivilegeSet
                            privileges={list1}
                            no={1}
                            click={selectPrivilegeList}
                            selectList={selectedList}
                          />
                          <PrivilegeSet
                            privileges={list2}
                            no={2}
                            click={selectPrivilegeList}
                            selectList={selectedList}
                          />
                        </div>
                      </>
                    )}

                    <div className="two-btns">
                      <Buttons
                        type={"button"}
                        color={"red"}
                        text={"Cancel"}
                        onClick={closeRoleAddForm}
                      />
                      <Buttons
                        type={"button"}
                        color={"green"}
                        text={"Create"}
                        onClick={displayConfirmationModal2}
                      />
                    </div>
                  </form>
                </Box>
              </Modal>
            </div>
            <ConfirmationdModal
              confirmModal={confirmationModal2}
              text={`Are you sure want create ${roleName} user role`}
              closeConfirmationModal={closeConfirmationModal2}
              submit={handelSubmitRoleAdd}
            />
          </>
          {/* )} */}
        </div>
        {emplyeeAddForm && (
          <div className="employye-add-form">
            <Modal
              open={emplyeeAddForm}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style} style={{ width: "550px" }}>
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                  Add employee details
                </h2>
                <form>
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
                          error
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
                      onChange={(e) => SetConfirmPassword(e.target.value)}
                      error={confirmPasswordErr !== "" && true}
                      helperText={
                        confirmPasswordErr !== "" && confirmPasswordErr
                      }
                    />
                  </div>
                  <div className="two-btns">
                    <Buttons
                      type={"button"}
                      color={"red"}
                      text={"Cancel"}
                      onClick={handleCloseEmployeeForm}
                    />
                    <Buttons
                      type={"button"}
                      color={"green"}
                      text={"Create"}
                      onClick={displayConfirmationModal1}
                    />
                  </div>
                </form>
              </Box>
            </Modal>
          </div>
        )}
        <ConfirmationdModal
          confirmModal={confirmationModal1}
          text={`Are you sure want add ${fName} as a HR Manager`}
          closeConfirmationModal={closeConfirmationModal1}
          submit={handelSubmitEmployyeAdd}
        />
      </div>
      <Snackbar open={alertBox} autoHideDuration={3000} onClose={closeAlertBox}>
        <Alert onClose={closeAlertBox} severity="success">
          Employee Added successfuly !
        </Alert>
      </Snackbar>
    </>
  );
};

function PrivilegeSet({ privileges, no, click, selectList }) {
  return (
    <div
      className={
        selectList === no ? "privilege-set-box select" : "privilege-set-box"
      }
    >
      <div className="privilege-set">
        {privileges.map((el) => (
          <label className="privilege">{el}</label>
        ))}
      </div>
      {selectList !== no && (
        <div className="select-btn-box">
          <button className="select-btn" onClick={() => click(no)}>
            Select
          </button>
        </div>
      )}
    </div>
  );
}

function SelectPlivilege({ privilegesList, click }) {
  return (
    <fieldset className="fieldset">
      <legend className="legend">Selected Privileges</legend>
      <div className="select-privilge-box">
        <div className="select-privileges">
          {privilegesList.map((el) => (
            <label className="privilege">{el}</label>
          ))}
        </div>
        <div className="select-btn-box">
          <button type="button" id="remove-btn" onClick={() => click(0)}>
            Remove
          </button>
        </div>
      </div>
    </fieldset>
  );
}

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

function UserRole({ role }) {
  return (
    <div className="user-role">
      <Link to="/userRole" state={role}>
        <img
          src={`http://localhost:4000/UserRoles/${role.photo_path}`}
          alt="cheif engineer"
        />
      </Link>
      <span>{role.role_name} </span>
    </div>
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
            <h2 id="child-modal-title">Text in a child modal</h2>
            <p id="child-modal-description">{text} </p>
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

export default AdminHome;
