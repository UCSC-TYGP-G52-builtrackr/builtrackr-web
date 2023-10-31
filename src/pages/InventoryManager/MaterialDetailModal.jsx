import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const MaterialDetailModal = ({ material, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-yellow-500 shadow-lg rounded-lg max-w-md w-full relative">
        <button
          className="bg-transparent absolute top-0 right-0 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{material.item_name}</h2>
          <div className="space-y-4">
            <div className="bg-white p-4">
              <p><strong>Material ID:</strong> {material.material_id}</p>
            </div>
            <div className="bg-white p-4">
              <p><strong>Material Name:</strong> {material.material_name}</p>
            </div>
            <div className="bg-white p-4">
              <p><strong>Material Qty:</strong> {material.quantity}</p>
            </div>
            <div className="bg-white p-4">
              <p><strong>Material Description:</strong> {material.description}</p>
            </div>
            <div className="bg-white p-4">
              <p><strong>Material Pre Order Level:</strong> {material.preorder_level}</p>
            </div>
            <div className="bg-white p-4">
              <p><strong>Material Type:</strong> {material.type}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialDetailModal;
