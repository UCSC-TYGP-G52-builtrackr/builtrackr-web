import React, { PureComponent } from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { json, useLocation } from "react-router-dom";
import NavBar from "../../components/CompanyAdmin/NavBar";
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
import { AiOutlinePlus } from "react-icons/ai";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import CircularProgress from "@mui/material/CircularProgress";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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

const AdminUserRole = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  const name = decryptData(JSON.parse(localStorage.getItem("name")));

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

  const [address2, setAddress2] = useState("");
  const [address2Err, setAddress2Err] = useState("");

  const [city, setCity] = useState("");
  const [cityErr, setCityErr] = useState("");

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

  const [image, setImage] = useState({});
  const [imageName, setImageName] = useState("");
  const [imageErr, setImageErr] = useState("");

  const [confirmationModal1, setConfirmationModal1] = useState(false);

  const displayConfirmationModal1 = async () => {
    let hasErrors = false;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const specialCharRegex = /[!@#$%^&*()\-_=+[{\]}|;:,<.>/?]/;
    const digitRegex = /\d/;

    const hasUppercase = uppercaseRegex.test(password);
    const hasLowercase = lowercaseRegex.test(password);
    const hasSpecialChar = specialCharRegex.test(password);
    const hasDigit = digitRegex.test(password);

    setImageErr("");
    setFNameErr("");
    setLNameErr("");
    setNicErr("");
    setPhoneErr("");
    setIdErr("");
    setEmailErr("");
    setAddressErr("");
    setPasswordErr("");
    setConfirmPasswordErr("");
    setDobErr("");
    setRegisterDateErr("");

    setIsLoadingConfirmation(true);

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
    if (image.name === undefined) {
      setImageErr("Select a image");
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

    try {
      await axios
        .post("http://localhost:4000/api/employee/employeeExists", {
          email: email,
        })
        .then((res) => {
          if (res.data.status) {
            hasErrors = true;
            setEmailErr("Email Already exist");
          }
        });
    } catch (err) {
      console.error(err.response.data.error);
    }

    try {
      await axios
        .post("http://localhost:4000/api/employee/EmployeeExistById", {
          company_id: company_id,
          employee_id: id,
        })
        .then((res) => {
          if (res.data.status) {
            hasErrors = true;
            setIdErr("Employee Id Already exist");
          }
        });
    } catch (err) {
      console.error(err.response.data.error);
    } finally {
      setIsLoadingConfirmation(false);
    }

    if (!hasErrors) {
      setConfirmationModal1(true);
    } else {
      return;
    }
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
    setAddress2("");
    setAddress2Err("");
    setCity("");
    setCityErr("");
    setPassword("");
    setPasswordErr("");
    setConfirmPassword("");
    setConfirmPasswordErr("");
    setImage({});
    setImageErr("");
    setImageName("");
    setDob("");
    setDobErr("");
    setRegisterDate("");
    setRegisterDateErr("");
  };

  const [selectedRole, setSelectedRole] = useState(0);

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

  const [employeeCount, setEmployeeCount] = useState([]);

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
    setSelectedListErr("");
  };

  const [hrAdded, setHrAdded] = useState(false);
  const [isLoadingRoles, setIsLoadingRoles] = useState(false);
  const [isLoadingCount, setIsLoadingCount] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [isLoadingConfirmation, setIsLoadingConfirmation] = useState(false);

  const [labourerTypesAdd, setLabourerTypesAdd] = useState(false);
  const labourerFormHandle = () => setLabourerTypesAdd(true);
  const [labourerTypeName, setLabourerTypeName] = useState("");
  const [labourerTypeNameErr, setLabourerTypeNameErr] = useState("");
  const [labourerTypes, setLabourerTypes] = useState([]);
  const [confirmationModal3, setConfirmationModal3] = useState(false);
  const closeConfirmationModal3 = () => {
    setConfirmationModal3(false);
  };
  const displayConfirmationModal3 = async () => {
    if (labourerTypeName === "") {
      setLabourerTypeNameErr("Enter labourer type name");
    } else if (labourerTypes.some((el) => el.type_name === labourerTypeName)) {
      setLabourerTypeNameErr("Already added");
    } else {
      setConfirmationModal3(true);
    }
  };

  const closeLabourerTypeAdd = () => {
    setLabourerTypesAdd(false);
    setLabourerTypeName("");
    setLabourerTypeNameErr("");
  };

  const handelSubmitLabourerType = async () => {
    try {
      const data = await fetch(
        "http://localhost:4000/api/employee/addLabourerTypes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            company_id: company_id,
            name: labourerTypeName,
          }),
        }
      );
      const jsonData = await data.json();
      toast.success("Labourer type added successfuly");
    } catch (err) {
      toast.error("Internal error, please try again latter");
    }
    setConfirmationModal3(false);
    setLabourerTypesAdd(false);
    setLabourerTypeName("");
    setLabourerTypeNameErr("");
  };

  useEffect(() => {
    const isHrAdded = async () => {
      try {
        const data = await fetch(
          "http://localhost:4000/api/employee/employeeExistsByType",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: company_id, type: 1 }),
          }
        );
        if (data.status === 200) {
          setHrAdded(true);
          console.log("HR added ok");
        } else {
          console.log(data.status);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    isHrAdded();
  }, []);

  useEffect(() => {
    const labourer = async () => {
      try {
        const data = await fetch(
          "http://localhost:4000/api/employee/getLabourerTypes",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ company_id: company_id }),
          }
        );
        const jsonData = await data.json();
        setLabourerTypes(jsonData);
        console.log(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
    labourer();
  }, [labourerTypesAdd]);

  useEffect(() => {
    setIsLoadingRoles(true);
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
      } finally {
        setIsLoadingRoles(false);
      }
    };
    viewUserRoles();
  }, [displayForm]);

  useEffect(() => {
    setIsLoadingCount(true);
    const viewEmployeeCount = async () => {
      try {
        const data = await fetch(
          "http://localhost:4000/api/employee/employeeCount",
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
          setEmployeeCount(jsonData);
          console.log(jsonData);
          console.log(employeeCount);
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setIsLoadingCount(false);
      }
    };
    viewEmployeeCount();
  }, [selectedRole, confirmationModal1, displayForm, confirmationModal2]);

  useEffect(() => {
    const viewEmployees = async () => {
      if (selectedRole === 6) {
        try {
          const data = await fetch(
            "http://localhost:4000/api/employee/getLabourers",
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
            setSelectedEmployee(jsonData);
          }
        } catch (err) {
          console.error(err.message);
        }
      } else {
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
            setSelectedEmployee(jsonData);
          }
        } catch (err) {
          console.error(err.message);
        }
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
          toast.success(`${roleName} user role created suuessfuly`);
        }
      } catch (err) {
        console.error(err.message);
      }
      setDisplayForm(false);
      setSelectedPrivileges([]);
      setRoleName("");
      setRoleImage("");
      setConfirmationModal2(false);
      setRoleNameErr("");
      setSelectedList(0);
    }
  };
  const handelSubmitEmployyeAdd = async (e) => {
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
      type: 1,
      imageName: imageName,
    };
    setIsLoadingError(true);

    try {
      const formDataImage = new FormData();
      formDataImage.append("image", image);
      const photoUpload = await axios.post(
        "http://localhost:4000/api/upload/employee",
        formDataImage,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (photoUpload.status === 200) {
        console.log(photoUpload.data);
        setImageName(photoUpload.data);
        formData.imageName = photoUpload.data;
        console.log(imageName);
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
            toast.success(
              "HR Manager registed successfuly. Email was sent to the employee"
            );
          } else if (data.status === 201) {
            toast.success(
              "HR Manager registed successfuly. But email was not sent to the employee"
            );
          }
        } catch (err) {
          console.error(err.message);
        } finally {
          setIsLoadingError(false);
        }
      }
    } catch (err) {
      console.log(err);
      closeConfirmationModal1(false);
      toast.error("Employee register not succes. Please try again later");
    } finally {
      setIsLoadingError(false);
    }

    closeConfirmationModal1(false);
    handleCloseEmployeeForm();
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
          <NavBar />
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
                {selectedRole !== 6 &&
                  selectUserRoleDetails
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
                  <div className="employee-table">
                    <Sheet sx={{ height: 550, overflow: "auto" }}>
                      <Table
                        aria-label="table with sticky header"
                        stickyHeader
                        stripe="odd"
                        hoverRow
                      >
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Employee No</th>
                            <th>Register date</th>
                            <th>Action</th>
                            <th>Status</th>
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
                      </Table>
                    </Sheet>
                    {/* <table className="employee-table">
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
                    </table> */}
                  </div>
                </>
              ) : (
                <h1 style={{ textAlign: "center" }}>No empolyees</h1>
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
                <AiOutlinePlus
                  style={{ marginLeft: "10px", marginTop: "5px" }}
                />
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
                {!hrAdded && (
                  <span className="link " onClick={handleOpenEmployeeForm}>
                    Click here to add a HR Manager
                  </span>
                )}
              </div>

              {isLoadingRoles ? (
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
                userRoles.map((element, i) => (
                  <UserRole
                    role={element}
                    key={element.role_id}
                    selectRole={displayRole}
                  />
                ))
              )}
              <div className="labourer">
                <UserRole
                  role={{
                    photo_path: "labourer.jpeg",
                    role_name: "Labourer",
                    type: 6,
                  }}
                  selectRole={displayRole}
                />
                <span className="link " onClick={labourerFormHandle}>
                  Click here to add Labourer types
                </span>
              </div>
            </div>
          )}
          {isLoadingCount ? (
            <div
              className="loading"
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            employeeCount &&
            selectedRole === 0 && (
              <div className="anlyatic-box">
                <div className="left-side">
                  <BarChart
                    width={600}
                    height={350}
                    data={employeeCount}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="role_name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#ffcc00" />
                    {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
                  </BarChart>
                </div>
              </div>
            )
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
                      Add User Roles
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

                      <div className="select-privilages-box">
                        <div className="select-privilages">
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
                  Add HR Manager employee details
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

                  <div className="image-button">
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                    <label htmlFor="file-upload" className="image-upload">
                      Select Image <InsertPhotoIcon />
                    </label>
                  </div>
                  {image.name !== undefined && (
                    <h1
                      style={{
                        marginTop: "6px",
                      }}
                    >
                      {image.name}
                    </h1>
                  )}

                  {imageErr && (
                    <>
                      <span
                        style={{
                          color: "#d32f2f",
                          fontSize: "13px",
                          marginLeft: "14px",
                        }}
                      >
                        {imageErr}
                      </span>
                    </>
                  )}
                  <div className="two-inputs" style={{ marginTop: "20px" }}>
                    <TextField
                      className="outlined-basic"
                      label="Password"
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
                  {isLoadingConfirmation ? (
                    <div
                      style={{
                        marginTop: "20px",
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <CircularProgress />
                    </div>
                  ) : (
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
                  )}
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
          loading={isLoadingError}
        />
        {labourerTypesAdd && (
          <div className="labourer-type-add-form">
            <Modal
              open={labourerTypesAdd}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style} style={{ width: "550px" }}>
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                  Allready Added Labourer Types
                </h2>
                <div className="labour-types-container">
                  {labourerTypes.map((el, i) => (
                    <LabourerTypeLabel name={el.type_name} />
                  ))}
                </div>
                <form>
                  <h2 style={{ textAlign: "center" }}>Add Labourer Types</h2>
                  <TextField
                    error={labourerTypeNameErr !== "" && true}
                    className="outlined-basic"
                    label="Labourer Type Name "
                    variant="outlined"
                    size="small"
                    sx={{ width: "100%", marginTop: "10px" }}
                    value={labourerTypeName}
                    onChange={(e) => setLabourerTypeName(e.target.value)}
                    helperText={
                      labourerTypeNameErr !== "" && labourerTypeNameErr
                    }
                  />
                  <div className="two-btns">
                    <Buttons
                      type={"button"}
                      color={"red"}
                      text={"Cancel"}
                      onClick={closeLabourerTypeAdd}
                    />
                    <Buttons
                      type={"button"}
                      color={"green"}
                      text={"Create"}
                      onClick={displayConfirmationModal3}
                    />
                  </div>
                </form>
              </Box>
            </Modal>
          </div>
        )}
        <ConfirmationdModal
          confirmModal={confirmationModal3}
          text={`Are you sure want add ${labourerTypeName} as a Labourer type.`}
          closeConfirmationModal={closeConfirmationModal3}
          submit={handelSubmitLabourerType}
          loading={isLoadingError}
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

function LabourerTypeLabel({ name }) {
  return (
    <>
      <lable className="laboure-type-lable">{name}</lable>
    </>
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
  loading,
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
          {loading ? (
            <div className="loading_err" style={{}}>
              <CircularProgress />
            </div>
          ) : (
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
          )}
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

export default AdminUserRole;
