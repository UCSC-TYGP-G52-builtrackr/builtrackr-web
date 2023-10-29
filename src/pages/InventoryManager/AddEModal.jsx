import React, { useState } from 'react';
import { Modal, Input, InputLabel, Typography, Button, Box } from '@mui/material';
import Swal from 'sweetalert2';

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

  const handleSubmitModal = () => {
    // Input validation
    if (!equipmentName || !equipmentDescription || isNaN(equipmentQty) || equipmentQty <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please enter valid data.',
      });
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
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Update the equipment data in the state with the added data
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
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <InputLabel htmlFor="equipmentDescription">Equipment Description</InputLabel>
            <Input
              value={equipmentDescription}
              onChange={(e) => setEquipmentDescription(e.target.value)}
              placeholder="Enter Description"
              sx={{ width: '100%' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <InputLabel htmlFor="equipmentQty">Equipment Quantity</InputLabel>
            <Input
              type="number"
              value={equipmentQty}
              onChange={(e) => setEquipmentQty(e.target.value)}
              placeholder="Enter Quantity"
              sx={{ width: '100%' }}
            />
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
