import { Link } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { URData } from "../../data/HrManager/URData";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/HrManager/HeaderHr";
import Dropdown from "../../components/HrManager/Dropdown";
import RegForm from "../../components/RegForm";
import React, { useState, useEffect } from "react";
import EmpRegForm from "../../components/HrManager/EmpRegForm";
import dummyEmployees from "../../data/HrManager/dummyEmployees";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiOutlinePlus } from "react-icons/ai";
import {
  faEye,
  faPencilAlt,
  faTrashAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Swal from "sweetalert2";
import EmployeeDetailModal from "./EmployeeDetailModal";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/system";
// import { useDemoData } from "@mui/x-data-grid-generator";

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
  // const { data } = useDemoData({
  //   dataSet: "Commodity",
  //   rowLength: 100,
  //   maxColumns: 6,
  // });
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
  const [roles, setRoles] = useState([]);

  const [sortingRole, setSortingRole] = useState(0);
  const [sortingRoleDetails, setSortingRoleDetails] = useState([]);

  const changeUserRole = (e) => {
    setSortingRole(e.target.value);
    const sort = e.target.value;
    setSortingRoleDetails(employees.filter((el) => el.type === sort));
  };
  console.log(sortingRoleDetails);
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
  console.log(company_id);
  const handleViewClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleCloseModal = () => {
    setSelectedEmployee(null);
  };

  const handleAddClick = () => {
    setemployeeAddForm(true);
  };

  const [employees, setEmployees] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [isLoading, setIsLoading] = useState(false);

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
          setRoles(jsonData);
        } else {
          console.log(data.status);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    viewUserRoles();
  }, [employeeAddForm]);

  useEffect(() => {
    setIsLoading(true);
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
          console.log(employees);
        } else {
          console.log(data.status);
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    viewEmployees();
  }, [employeeAddForm]);

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

          <div
            className="top-container"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="">
              <InputLabel id="demo-simple-select-label">
                Employee Type
              </InputLabel>
              <Select
                style={{ width: "200px" }}
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortingRole}
                label="Employee Type"
                onChange={changeUserRole}
              >
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={1}>HR Manager</MenuItem>
                {roles.map((el) => (
                  <MenuItem value={el.type}>{el.role_name}</MenuItem>
                ))}
                <MenuItem value={6}>Labourer</MenuItem>
              </Select>
            </div>
            <Button
              variant="contained"
              color="warning"
              className="bg-yellow-400"
              onClick={handleAddClick}
              style={{
                backgroundColor: "#ffcc00",
                color: "black",
                height: "40px",
                marginTop: "10px",
              }}
            >
              Add Employee
              <AiOutlinePlus style={{ marginLeft: "10px" }} />
            </Button>
          </div>

          <div className="p-8" style={{ marginTop: "10px" }}>
            {isLoading ? (
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
              <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="p-4 border">#</th>
                      <th className="p-4 border">Employee ID</th>
                      <th className="p-4 border">First Name</th>
                      <th className="p-4 border">Last Name</th>
                      <th className="p-4 border">Position</th>
                      <th className="p-4 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortingRole === 0 &&
                      (rowsPerPage > 0
                        ? employees.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : employees
                      ).map((employee) => (
                        <tr key={employee.empID} className="border">
                          <td>
                            <img
                              src={`http://localhost:4000/employees/${employee.photo_path}`}
                              alt="profile"
                              style={{
                                width: "40px",
                                height: "40px",
                                objectFit: "contain",
                                borderRadius: "50%",
                                display: "block",
                                margin: "auto",
                              }}
                            />
                          </td>
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
                    {sortingRole !== 0 &&
                      (rowsPerPage > 0
                        ? sortingRoleDetails.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : sortingRoleDetails
                      ).map((employee) => (
                        <tr key={employee.empID} className="border">
                          <td>
                            <img
                              src={`http://localhost:4000/employees/${employee.photo_path}`}
                              alt="profile"
                              style={{
                                width: "40px",
                                height: "40px",
                                objectFit: "contain",
                                borderRadius: "50%",
                                display: "block",
                                margin: "auto",
                              }}
                            />
                          </td>
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
            )}
            <div
              className=""
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <CustomTablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={
                  sortingRole === 0
                    ? employees.length
                    : sortingRoleDetails.length
                }
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    "aria-label": "rows per page",
                  },
                  actions: {
                    showFirstButton: true,
                    showLastButton: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
            {/* <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                {...data}
                initialState={{
                  ...data.initialState,
                  pagination: { paginationModel: { pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10, 25]}
              />
            </div> */}

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
              {/* {showEmpRegForm && <EmpRegForm onClose={handleCloseForm} />} */}
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

const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 10px;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;

export default Employees;
