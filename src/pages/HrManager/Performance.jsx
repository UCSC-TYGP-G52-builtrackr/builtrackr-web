
import { Link } from 'react-router-dom';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { URData } from '../../data/HrManager/URData';

import Header from '../../components/HrManager/HeaderHr';
import Dropdown from '../../components/HrManager/Dropdown';
import RegForm from '../../components/RegForm';
import React, { useState } from 'react';

import dummyEmployees from '../../data/HrManager/dummyEmployees';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrashAlt, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import EmployeeDetailModal from './EmployeeDetailModal';


//import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
//import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

// dashboard common components
import Navbar from '../../components/HrManager/NavbarHr'
import Sidebar from '../../components/Sidebar';
import SidebarHR from '../../components/HrManager/SidebarHR';
import ChatSpace from '../../components/HrManager/ChatSpace';
import { BsChatDots } from 'react-icons/bs';

import { useNavigate } from "react-router-dom";
import { useStateContext } from '../../contexts/ContextProvider';
import '../../App.css';

const Performance = () => {
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
  const employeeRatings = [
    { empID: 1, rating: 4 },
    { empID: 2, rating: 5 },
    { empID: 3, rating: 3 },
    // Add more ratings as needed
  ];

  const getEmployeeRating = (empID) => {
    const ratingData = employeeRatings.find((rating) => rating.empID === empID);
    return ratingData ? ratingData.rating : 0;
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
                <Header title="Performance Review" category="gdfcgf"/>
              </div>

            {/* site managers grid */}
           
            <div className="p-8">
     
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="p-4 border">Employee ID</th>
              <th className="p-4 border">Employee Name</th>
              <th className="p-4 border">Designation</th>
              <th className="p-4 border">Rating</th>
            </tr>
          </thead>
          <tbody>
            {dummyEmployees.map((employee) => (
              <tr key={employee.empID} className="border">
                <td className="p-4">{employee.empID}</td>
                <td className="p-4">{`${employee.firstName} ${employee.lastName}`}</td>
                <td className="p-4">{employee.designation}</td>
                <td className="p-4">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, index) => (
                      <FontAwesomeIcon
                        key={index}
                        icon={faStar}
                        color={getEmployeeRating(employee.empID) >= index + 1 ? 'yellow' : 'gray'}
                      />
                    ))}
                    <span className="text-gray-500 ml-2">
                      ({getEmployeeRating(employee.empID)}/5)
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
            </div>
 
            {/* end of sites grid */}

          </div>
        
          </div>
    
    
  );
};

export default Performance;