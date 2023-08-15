import { Link } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { URData } from "../../data/HrManager/URData";

import Header from "../../components/HrManager/HeaderHr";
import Dropdown from "../../components/HrManager/Dropdown";
import RegForm from "../../components/RegForm";
import React, { useState,useEffect } from "react";
import EmpRegForm from "../../components/HrManager/EmpRegForm";
import dummyEmployees from "../../data/HrManager/dummyEmployees";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiOutlinePlus } from 'react-icons/ai'
import {
  faEye,
  faPencilAlt,
  faTrashAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import EmployeeDetailModal from "./EmployeeDetailModal";

// dashboard common components
import Navbar from "../../components/HrManager/NavbarHr";
import Sidebar from "../../components/Sidebar";
import SidebarHR from "../../components/HrManager/SidebarHR";
import ChatSpace from "../../components/ChatSpace";
import { BsChatDots } from "react-icons/bs";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "../../CSS/HrManager/App.css";
import { decryptData } from "../../encrypt";

const Employees = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Delete"];
  const editing = { allowDeleting: true, allowEditing: true };
  const navigate = useNavigate();
  const company_id = parseInt(
    decryptData(JSON.parse(localStorage.getItem("company_id")))
  );
  const { themeSettings, setThemeSettings } = useStateContext();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeAddForm, setemployeeAddForm] = useState(false);

  const displayConfirmation = () => {};
  const handleDeleteClick = (employee) => {
    Swal.fire({
      title: "Delete Employee?",
      text: `Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: Perform the actual delete operation here
        // For now, let's just log a message
        console.log(`Deleted ${employee.firstName} ${employee.lastName}`);
      }
    });
  };

  const handleViewClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleCloseModal = () => {
    setSelectedEmployee(null);
  };

  const [showEmpRegForm, setShowEmpRegForm] = useState(false);

  const handleAddClick = () => {
    setemployeeAddForm(true);
  };

  const handleCloseForm = () => {
    setShowEmpRegForm(false);
  };
  const [employees,setEmployees] = useState([])

  useEffect(() => {
    const viewEmployees = async () => {
      try {
        const data = await fetch(
          "http://localhost:4000/api/employee/getAllEmployees",
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
          setEmployees(jsonData);
          console.log(employees)
        } else {
          console.log(data.status);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    viewEmployees();
  }, [showEmpRegForm]);

  return (
    <div className="">
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
        <SidebarHR />
      </div>
      <div className="ml-72">
        <div className="fixed w-full md:static bg-main-bg dark:bg-main-dark-bg navbar ">
          <Navbar />
        </div>
        {themeSettings && <ChatSpace />}
        <ToastContainer />
        <div className="md:pb-5 md:m-10 md:px-5 rounded-3xl">
          <div className="flex mb-8">
            <Header title="Employees" category="gdfcgf" />
          </div>

          {/* site managers grid */}

          <Button
            variant="contained"
            color="warning"
            className="bg-yellow-400"
            onClick={handleAddClick}
            style={{ position: "absolute", right: "30px" , backgroundColor:"#ffcc00", color:"black"}}
          >
            Add Employee
            <AiOutlinePlus style={{marginLeft:"10px"}}/>
          </Button>

          <div className="p-8" style={{marginTop:"70px"}}>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-4 border">Employee ID</th>
                    <th className="p-4 border">First Name</th>
                    <th className="p-4 border">Last Name</th>
                    <th className="p-4 border">Position</th>
                    <th className="p-4 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.empID} className="border">
                      <td className="p-4">{employee.id}</td>
                      <td className="p-4">{employee.f_name}</td>
                      <td className="p-4">{employee.l_name}</td>
                      <td className="p-4">{employee.role_name}</td>
                      <td className="p-4 text-center">
                        <button
                          className="mr-3"
                          onClick={() => handleViewClick(employee)}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                        <button className="mr-3">
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </button>
                        <button onClick={() => handleDeleteClick(employee)}>
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4">
              {/* <Link
  to="/EmpRegForm"
  className="bg-yellow-400 text-white py-2 px-4 rounded shadow hover:bg-yellow-500"
>
  <FontAwesomeIcon icon={faPlus} className="mr-2" />
  Add Employee
</Link> */}

              <EmpRegForm
                employeeAddForm={employeeAddForm}
                setemployeeAddForm={setemployeeAddForm}
              />
              {showEmpRegForm && <EmpRegForm onClose={handleCloseForm} />}
            </div>
            {selectedEmployee && (
              <EmployeeDetailModal
                employee={selectedEmployee}
                onClose={handleCloseModal}
              />
            )}
          </div>
        </div>

        {/* end of sites grid */}
      </div>
    </div>
  );
};

export default Employees;
