import React from "react";

const Modal = ({ show, onClose, employeeId, employeeName, leaveDetails }) => {
  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-black z-50">
      <div className="bg-white rounded-lg p-6">
        <div className="text-xl font-bold mb-4">{`Employee ID: ${employeeId} - ${employeeName}`}</div>
        <ul>
          {leaveDetails.map((detail, index) => (
            <li key={index} className="mb-2">
              {detail}
            </li>
          ))}
        </ul>
        <button
          className="py-2 px-4 mt-4 bg-blue-500 text-white rounded-lg"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
