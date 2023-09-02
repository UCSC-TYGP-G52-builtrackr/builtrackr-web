// EmployeeDetailModal.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const EmployeeDetailModal = ({ employee, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-md max-w-md w-full">
        <div className="flex justify-end p-4">
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            {employee.firstName} {employee.lastName}
          </h2>
          <div className="flex items-center space-x-4">
            {/* <img
              src={employee.profilePicture}
              alt={`${employee.firstName} ${employee.lastName}`}
              className="w-24 h-24 rounded-full"
            /> */}
            <div>
              <p><strong>Employee ID:</strong> {employee.id}</p>
              <p><strong>First Name:</strong> {employee.f_name}</p>
              <p><strong>Last Name:</strong> {employee.l_name}</p>
              <p><strong>Date of Birth:</strong> {employee.dob}</p>
              <p><strong>NIC Number:</strong> {employee.nic}</p>
              <p><strong>Address:</strong> {employee.address}</p>
              <p><strong>Mobile:</strong> {employee.tel_no}</p>
              <p><strong>Email:</strong> {employee.email}</p>
              <p><strong>Registered Date:</strong> {employee.register_date}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailModal;
