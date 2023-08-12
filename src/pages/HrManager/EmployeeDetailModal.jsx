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
            <img
              src={employee.profilePicture}
              alt={`${employee.firstName} ${employee.lastName}`}
              className="w-24 h-24 rounded-full"
            />
            <div>
              <p><strong>ID:</strong> {employee.empID}</p>
              <p><strong>Designation:</strong> {employee.designation}</p>
              <p><strong>Gender:</strong> {employee.gender}</p>
              <p><strong>Address:</strong> {employee.address}</p>
              <p><strong>NIC Number:</strong> {employee.nicNumber}</p>
              <p><strong>Mobile:</strong> {employee.mobile}</p>
              <p><strong>Email:</strong> {employee.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailModal;
