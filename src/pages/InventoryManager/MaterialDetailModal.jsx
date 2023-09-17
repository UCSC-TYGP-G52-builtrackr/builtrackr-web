// EmployeeDetailModal.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const MaterialDetailModal = ({ material, onClose }) => {
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
            {material.item_name}
          </h2>
          <div className="flex items-center space-x-4">
           
            <div>
              <p><strong>Material ID:</strong> {material.material_id}</p>
              <p><strong>Designation:</strong> {material.item_name}</p>
              <p><strong>Gender:</strong> {material.quantity}</p>
           
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialDetailModal;
