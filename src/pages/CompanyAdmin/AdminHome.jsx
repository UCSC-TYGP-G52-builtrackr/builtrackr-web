import react from "react";
import { useState, useRef, useEffect } from "react";
import { json, useLocation } from "react-router-dom";
import Navbar from "../../components/CompanyAdmin/NavBar";
import SideBar from "../../components/CompanyAdmin/SideBar";
import ChatSpace from "../../components/CompanyAdmin/ChatSpace";
import { decryptData } from "../../encrypt";
import { useStateContext } from "../../contexts/ContextProvider";
import { BsChatDots } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { Snackbar, Alert } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IoIosArrowDropleft } from "react-icons/io";

import "./adminHome.css";
import { imageListClasses } from "@mui/material";
import { SelectField } from "@chakra-ui/react";

const list1 = [
  "Create Employee Profiles",
  "Manage Employee Status",
  "Manage Employee Recor",
];

const list2 = [
  "Manage Categories",
  "Manage Sub-Categories",
  "Mange Items",
  "Track the Quantity and Availability of Inventory",
];
const list3 = [
  " Create Construction Sites",
  "Assign Property Owners",
  "Assign Site Manager and Tasks",
  "View Progress and Analytics",
  "Upload Design Documents",
];
const list4 = [
  "Select a Supervisor ",
  "Assign Tasks to a Supervisor",
  "Add Guidelines Documents",
  "View Progress and Analytics",
  "Review Completed Tasks",
  "Upload Photos for Clients",
  "Review Declined Tasks",
  "Manage Inventory Records",
  "Generate Customized Reports",
];
const list5 = [
  "Assign Labourers",
  "View Progress and Analytics",
  "Unassign Labourers",
  "Generate Customized Reports",
  "Decline Task",
  "View and Filter Tasks by Status",
  "Update Completed Task Status",
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nicRegex1 = /^[2-9]+[0-9]{8}[vVxX]$/;
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

  const name = decryptData(JSON.parse(localStorage.getItem("name")));
  console.log(name)

  const company_id = parseInt(
    decryptData(JSON.parse(localStorage.getItem("company_id")))
  );
  console.log(company_id);
  const [displayForm, setDisplayForm] = useState(false);
  const [selectedPrivileges, setSelectedPrivileges] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [emplyeeAddForm, setEmployeeAddForm] = useState(false);

  const handleOpenEmployeeForm = () => setEmployeeAddForm(true);

  // User role add
  const [roleImage, setRoleImage] = useState("");
  const [roleImageErr, setRoleImageErr] = useState("");

  const [roleName, setRoleName] = useState("");
  const [roleNameErr, setRoleNameErr] = useState("");

  const [selectedList, setSelectedList] = useState(0);
  const [selctedListErr, setSelectedListErr] = useState("");

  const selectPrivilegeList = (no) => {
    setSelectedList(no);
    setSelectedListErr("");
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
  const [registerDateErr, setRegisterDateErr] = useState("");

  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const [nic, setNic] = useState("");
  const [nicErr, setNicErr] = useState("");

  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");

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

  // Handle Created and not created user roles privileges lists
  let addedList2;
  let addedList3;
  let addedList4;
  let addedList5;
  userRoles.filter((el) => el.type === 2).map((el) => (addedList2 = true));
  userRoles.filter((el) => el.type === 3).map((el) => (addedList3 = true));
  userRoles.filter((el) => el.type === 4).map((el) => (addedList4 = true));
  userRoles.filter((el) => el.type === 5).map((el) => (addedList5 = true));

  let allRoleAdded =
    addedList2 && addedList3 && addedList4 && addedList5 ? true : false;

  console.log(allRoleAdded);

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
    setConfirmPassword("");
    setConfirmPasswordErr("");
    setDob("");
    setDobErr("");
    setRegisterDate("");
    setRegisterDateErr("");
  };

  const [selectedRole, setSelectedRole] = useState(0);
  console.log(selectedRole);

  const backToAdminHome = () => {
    setSelectedRole(0);
    setSelectedEmployee([]);
  };

  const displayRole = (type) => {
    setSelectedRole(type);
  };

  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const selectUserRoleDetails = userRoles.filter(
    (item) => item.type === selectedRole
  );
  console.log(selectUserRoleDetails);
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
    setSelectedListErr("");
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
          console.log(jsonData);
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

  useEffect(() => {
    const viewEmployees = async () => {
      try {
        const data = await fetch(
          "http://localhost:4000/api/employee/getEmployees",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: company_id, type: selectedRole }),
          }
        );
        if (data.status === 200) {
          const jsonData = await data.json();
          console.log(jsonData);
          setSelectedEmployee(jsonData);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    viewEmployees();
  }, [selectedRole]);

  const handelSubmitRoleAdd = async (e) => {
    e.preventDefault();
    let hasErrors = false;
    setRoleNameErr("");

    if (roleName === "") {
      setRoleNameErr("Enter User Role Name");
      hasErrors = true;
    }
    if (selectedList === 0) {
      setSelectedListErr("Please select a privilege list");
      hasErrors = true;
    }
    if (hasErrors) {
      setConfirmationModal2(false);
      return;
    } else {
      console.log(roleNameErr);
      try {
        const data = await fetch("http://localhost:4000/api/user/addUserRole", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: roleName,
            type: selectedList,
            company_id: company_id,
          }),
        });

        if (data.status === 200) {
          const jsonData = await data.json();
          console.log(jsonData);
          toast.success(`${roleName} user role created suuessfuly`);
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
      setSelectedList(0);
    }
  };

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
    setPasswordErr("");
    setConfirmPasswordErr("");

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
    if (password.length === 0) {
      setPasswordErr("Enter password");
      hasErrors = true;
    }
    if (confirmPassword.length === 0) {
      setConfirmPasswordErr("Confirm password");
      hasErrors = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordErr("Passowrds not matched");
    }

    if (!hasErrors) {
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
      console.log(lNameErr);
      console.log(fNameErr);
      console.log(nicErr);
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
          toast.success("HR Manager registed successfuly");
        }
      } catch (err) {
        console.error(err.message);
      }
      closeConfirmationModal1(false);
      handleCloseEmployeeForm();
    } else {
      console.log("Hiiiiiii");
      setConfirmationModal1(false);
      return;
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
      <div className="fixed bg-white w-72 sidebar dark:bg-secondary-dark-bg ">
        <SideBar />
      </div>
      <div className="ml-72">
        <div className="fixed w-full md:static bg-main-bg dark:bg-main-dark-bg navbar ">
          <Navbar name={name} />
        </div>
        {themeSettings && <ChatSpace />}
        <div
          className="rest"
          style={{
            paddingTop: "80Px",
          }}
        >
          <ToastContainer />
          {selectedRole !== 0 && (
            <IoIosArrowDropleft
              size="30px"
              style={{ marginLeft: "20px", cursor: "pointer" }}
              onClick={backToAdminHome}
            />
          )}
          {selectedRole !== 0 && (
            <div
              className="main"
              style={{
                height: "fit-content",
              }}
            >
              <div className="role-privileges">
                {selectedRole === 1 && (
                  <h1 className="role-title">HR Manager's all privileges</h1>
                )}
                {selectUserRoleDetails
                  .filter((element) => element.type !== 1)
                  .map((el) => (
                    <h1 className="role-title">{`${el.role_name}'s all privileges`}</h1>
                  ))}

                <div className="privileges-box">
                  {selectedRole === 1 &&
                    list1.map((element, i) => (
                      <OnePrivilege key={i} privilege={element} />
                    ))}
                  {selectedRole === 2 &&
                    list2.map((element, i) => (
                      <OnePrivilege key={i} privilege={element} />
                    ))}
                  {selectedRole === 3 &&
                    list3.map((element, i) => (
                      <OnePrivilege key={i} privilege={element} />
                    ))}
                  {selectedRole === 4 &&
                    list4.map((element, i) => (
                      <OnePrivilege key={i} privilege={element} />
                    ))}
                  {selectedRole === 5 &&
                    list5.map((element, i) => (
                      <OnePrivilege key={i} privilege={element} />
                    ))}
                </div>
              </div>
              {console.log(selectedEmployee)}

              {selectedEmployee.length !== 0 ? (
                <>
                  <div>
                    <table className="employee-table">
                      <thead>
                        <tr>
                          <td>Name</td>
                          <td>Employee No</td>
                          <td>Register date</td>
                          <td>Action</td>
                          <td>Status</td>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedEmployee.map((element) => (
                          <tr>
                            <td>{element.f_name}</td>
                            <td>{element.id}</td>
                            <td>{element.register_date}</td>
                            <td>Edit Privileges</td>
                            <td>Working</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <h1>No emplyees</h1>
              )}
            </div>
          )}
          {selectedRole === 0 && !allRoleAdded && (
            <div className="button">
              <button
                className="add-button"
                onClick={() => setDisplayForm(true)}
              >
                Add user roles
              </button>
            </div>
          )}
          {selectedRole === 0 && (
            <div className="user-roles">
              <div className="hr-role">
                <UserRole
                  role={{
                    photo_path: "HR.jpeg",
                    role_name: "HR Manager",
                    type: 1,
                  }}
                  selectRole={displayRole}
                />
                <span className="link " onClick={handleOpenEmployeeForm}>
                  Click here to add an employee
                </span>
              </div>

              {userRoles.map((element, i) => (
                <UserRole
                  role={element}
                  key={element.role_id}
                  selectRole={displayRole}
                />
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
                <div>
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
                          {selectedList === 3 && (
                            <SelectPlivilege
                              privilegesList={list3}
                              click={selectPrivilegeList}
                            />
                          )}
                          {selectedList === 4 && (
                            <SelectPlivilege
                              privilegesList={list4}
                              click={selectPrivilegeList}
                            />
                          )}
                          {selectedList === 5 && (
                            <SelectPlivilege
                              privilegesList={list5}
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
                          <div
                            className="all-privileges-set"
                            id={selctedListErr && "selected-list-error"}
                          >
                            {!addedList2 && (
                              <PrivilegeSet
                                privileges={list2}
                                no={2}
                                key={2}
                                click={selectPrivilegeList}
                                selectList={selectedList}
                              />
                            )}
                            {!addedList3 && (
                              <PrivilegeSet
                                privileges={list3}
                                no={3}
                                key={3}
                                click={selectPrivilegeList}
                                selectList={selectedList}
                              />
                            )}
                            {!addedList4 && (
                              <PrivilegeSet
                                privileges={list4}
                                no={4}
                                key={4}
                                click={selectPrivilegeList}
                                selectList={selectedList}
                              />
                            )}
                            {!addedList5 && (
                              <PrivilegeSet
                                privileges={list5}
                                no={5}
                                key={5}
                                click={selectPrivilegeList}
                                selectList={selectedList}
                              />
                            )}
                          </div>
                          {selctedListErr && (
                            <span className="selecte-list-err">
                              {selctedListErr}
                            </span>
                          )}
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
                </div>
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
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                      onChange={(e) => setConfirmPassword(e.target.value)}
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

function UserRole({ role, selectRole }) {
  return (
    <div className="user-role">
      <img
        src={`http://localhost:4000/UserRoles/${role.photo_path}`}
        alt="cheif engineer"
        onClick={() => selectRole(role.type)}
        style={{ cursor: "pointer" }}
      />
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

function OnePrivilege({ privilege }) {
  return (
    <div className="privilege">
      <h3>{privilege}</h3>
    </div>
  );
}

export default AdminHome;
