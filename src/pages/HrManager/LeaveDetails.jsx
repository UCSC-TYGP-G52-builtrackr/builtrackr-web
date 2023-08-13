
import { Link } from 'react-router-dom';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { URData } from '../../data/HrManager/URData';

import dummyLeaveData from "../../data/HrManager/dummyLeaveData";
import Modal from "./Modal";
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
import '../../App.css';

const LeaveDetails = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };
  const navigate = useNavigate();
  const { themeSettings, setThemeSettings } = useStateContext();
 
  const currentDate = new Date().toISOString().split("T")[0];

  const [showPreviousId, setShowPreviousId] = useState(null);
  const [showUpcomingId, setShowUpcomingId] = useState(null);

  const togglePrevious = (id) => {
    setShowPreviousId(showPreviousId === id ? null : id);
    setShowUpcomingId(null);
  };

  const toggleUpcoming = (id) => {
    setShowUpcomingId(showUpcomingId === id ? null : id);
    setShowPreviousId(null);
  };

  const getEmployeeById = (id) => dummyLeaveData.find((employee) => employee.id === id);


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
            <Header title="Leave Details" category="gdfcgf"/>
          </div>
          <div className="p-8">
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-4 border">ID</th>
                    <th className="p-4 border">Name</th>
                    <th className="p-4 border">Position</th>
                    <th className="p-4 border">Availability</th>
                    <th className="p-4 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyLeaveData.map((employee) => (
                    <tr
                      key={employee.id}
                      className="border transition-all duration-300 ease-in-out"
                    >
                      <td className="p-4">{employee.id}</td>
                      <td className="p-4">{employee.name}</td>
                      <td className="p-4">{employee.position}</td>
                      <td className="p-4 flex items-center">
                        <div
                          style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            marginRight: '8px',
                            backgroundColor: employee.available ? 'green' : 'red',
                          }}
                        ></div>
                        {employee.available ? 'Available' : 'Not Available'}
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center space-x-2">
                          <button
                            className="py-1 px-2 rounded-lg text-xs bg-yellow-400 text-black border border-white"
                            onClick={() => togglePrevious(employee.id)}
                          >
                            Previous
                          </button>
                          <button
                            className="py-1 px-2 rounded-lg text-xs bg-yellow-400 text-black border border-white"
                            onClick={() => toggleUpcoming(employee.id)}
                          >
                            Upcoming
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              show={showPreviousId !== null || showUpcomingId !== null}
              onClose={() => {
                setShowPreviousId(null);
                setShowUpcomingId(null);
              }}
              employeeId={
                showPreviousId !== null ? getEmployeeById(showPreviousId)?.id : getEmployeeById(showUpcomingId)?.id
              }
              employeeName={
                showPreviousId !== null ? getEmployeeById(showPreviousId)?.name : getEmployeeById(showUpcomingId)?.name
              }
              leaveDetails={
                showPreviousId !== null
                  ? getEmployeeById(showPreviousId)?.leaves
                      .filter((leave) => leave.date < currentDate)
                      .map((leave) => `${leave.date} (Previous Leave)`)
                  : getEmployeeById(showUpcomingId)?.leaves
                      .filter((leave) => leave.date >= currentDate)
                      .map((leave) => `${leave.date} (Upcoming Leave)`)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveDetails;