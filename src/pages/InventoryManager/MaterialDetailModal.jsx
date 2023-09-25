import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const MaterialDetailModal = ({ material, onClose }) => {
  return (
    <div style={{
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: '50',
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
        maxWidth: '400px',
        width: '100%',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '16px',
        }}>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={onClose}
            style={{
              border: 'none',
              background: 'none',
              cursor: 'pointer',
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div style={{
          padding: '24px',
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
          }}>
            {material.item_name}
          </h2>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}>
            <div>
              <p><strong>Material ID  :</strong> {material.material_id}</p>
              <p><strong>Material Name:</strong> {material.item_name}</p>
              <p><strong>Material Qty :</strong> {material.quantity}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialDetailModal;
