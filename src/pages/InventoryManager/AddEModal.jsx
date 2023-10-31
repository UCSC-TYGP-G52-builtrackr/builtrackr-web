import React, { useState } from 'react';
import { Modal, Input, InputLabel, Typography, Button, Box } from '@mui/material';
import Swal from 'sweetalert2';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'white',
  boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
  borderRadius: '10px',
  p: 4,
};

const AddEModal = ({ isOpen, onClose, setEquipmentData }) => {
  const [equipmentName, setEquipmentName] = useState('');
  const [equipmentDescription, setEquipmentDescription] = useState('');
  const [equipmentQty, setEquipmentQty] = useState('');

  const [validationErrors, setValidationErrors] = useState({
    equipmentName: false,
    equipmentDescription: false,
    equipmentQty: false,
  });

  const handleSubmitModal = () => {
    // Input validation
    let hasError = false;

    if (!equipmentName) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        equipmentName: true,
      }));
      hasError = true;
    } else {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        equipmentName: false,
      }));
    }

    if (!equipmentDescription) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        equipmentDescription: true,
      }));
      hasError = true;
    } else {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        equipmentDescription: false,
      }));
    }

    if (isNaN(equipmentQty) || equipmentQty <= 0) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        equipmentQty: true,
      }));
      hasError = true;
    } else {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        equipmentQty: false,
      }));
    }

    if (hasError) {
      return;
    }

    // Prepare the new equipment data
    const newEquipment = {
      equipment_name: equipmentName,
      description: equipmentDescription,
      quantity: equipmentQty,
    };

    // Make an HTTP request to add the equipment data
    fetch('http://localhost:4000/api/equipment/addEquipment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEquipment),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setEquipmentData((prevEquipmentData) => [...prevEquipmentData, data]);

        // Show a success message using SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Your equipment has been successfully added!',
        });
      })
      .catch((error) => {
        console.error('Error adding equipment data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to add equipment. Please try again.',
        });
      });

    // Close the modal
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <IconButton
          style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}
          onClick={onClose}
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>
          Add Equipment
        </Typography>
        <form>
          <div style={{ marginBottom: '20px' }}>
            <InputLabel htmlFor="equipmentName">Equipment Name</InputLabel>
            <Input
              value={equipmentName}
              onChange={(e) => setEquipmentName(e.target.value)}
              placeholder="Enter equipment name"
              sx={{ width: '100%' }}
              error={validationErrors.equipmentName}
            />
            {validationErrors.equipmentName && (
              <div style={{ color: 'red' }}>Equipment name is required</div>
            )}
          </div>
          <div style={{ marginBottom: '20px' }}>
            <InputLabel htmlFor="equipmentDescription">Equipment Description</InputLabel>
            <Input
              value={equipmentDescription}
              onChange={(e) => setEquipmentDescription(e.target.value)}
              placeholder="Enter Description"
              sx={{ width: '100%' }}
              error={validationErrors.equipmentDescription}
            />
            {validationErrors.equipmentDescription && (
              <div style={{ color: 'red' }}>Equipment description is required</div>
            )}
          </div>
          <div style={{ marginBottom: '20px' }}>
            <InputLabel htmlFor="equipmentQty">Equipment Quantity</InputLabel>
            <Input
              type="number"
              value={equipmentQty}
              onChange={(e) => setEquipmentQty(e.target.value)}
              placeholder="Enter Quantity"
              sx={{ width: '100%' }}
              error={validationErrors.equipmentQty}
            />
            {validationErrors.equipmentQty && (
              <div style={{ color: 'red' }}>Please enter a valid quantity</div>
            )}
          </div>
          <Button
            onClick={handleSubmitModal}
            variant="contained"
            style={{ backgroundColor: "#f59e0b" }}
          >
            Add Equipment
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddEModal;
