
import { Link } from 'react-router-dom';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { URData } from '../../data/HrManager/URData';

import Header from '../../components/HrManager/HeaderHr';
import Dropdown from '../../components/HrManager/Dropdown';
import RegForm from '../../components/RegForm';
import React, { useState } from 'react';

import dummyEmployees from '../../data/HrManager/dummyEmployees';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import EmployeeDetailModal from './EmployeeDetailModal';

// dashboard common components
import Navbar from '../../components/HrManager/NavbarHr'
import Sidebar from '../../components/Sidebar';
import SidebarHR from '../../components/HrManager/SidebarHR';
import ChatSpace from '../../components/ChatSpace';
import { BsChatDots } from 'react-icons/bs';

import { useNavigate } from "react-router-dom";
import { useStateContext } from '../../contexts/ContextProvider';
import '../../CSS/HrManager/App.css';

const Employees = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };
  const navigate = useNavigate();
  const { themeSettings, setThemeSettings } = useStateContext();
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleDeleteClick = (employee) => {
    Swal.fire({
      title: 'Delete Employee?',
      text: `Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
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


  return (
    <div className="">
      <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ backgroundColor: 'yellow-400', borderRadius: '50%' }}
                className="p-3 text-3xl text-white bg-yellow-400 hover:drop-shadow-xl"
              >
                <BsChatDots />
              </button>
          </div>
      <div className="fixed bg-white w-72 sidebar dark:bg-secondary-dark-bg ">
        <SidebarHR />
      </div>
      <div className='ml-72'>
            <div className="fixed w-full md:static bg-main-bg dark:bg-main-dark-bg navbar ">
              <Navbar />
            </div>
            {themeSettings && (<ChatSpace />)}
            <div className="md:pb-5 md:m-10 md:px-5 rounded-3xl">
              <div className="flex mb-8">
                <Header title="Employees" category="gdfcgf"/>
              </div>

            {/* site managers grid */}
           
            <div className="p-8">
 
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="p-4 border">ID</th>
              <th className="p-4 border">First Name</th>
              <th className="p-4 border">Last Name</th>
              <th className="p-4 border">Position</th>
              <th className="p-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyEmployees.map(employee => (
              <tr key={employee.empID} className="border">
                <td className="p-4">{employee.empID}</td>
                <td className="p-4">{employee.firstName}</td>
                <td className="p-4">{employee.lastName}</td>
                <td className="p-4">{employee.designation}</td>
                <td className="p-4 text-center">
                  <button className="mr-3" onClick={() => handleViewClick(employee)}>
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
        <Link
          to="/AddEmployee"
          className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add Employee
        </Link>
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