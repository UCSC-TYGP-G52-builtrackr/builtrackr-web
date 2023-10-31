import React, { useState, useEffect } from 'react';
import { Modal, Input, InputLabel, Typography, Button, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2'; // Import SweetAlert

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

const EditEModal = ({ isOpen, onClose, equipmentData, setEquipmentData }) => {
  const [equipmentName, setEquipmentName] = useState('');
  const [equipmentDescription, setEquipmentDescription] = useState('');
  const [equipmentQty, setEquipmentQty] = useState('');

  const [validationErrors, setValidationErrors] = useState({
    equipmentName: false,
    equipmentDescription: false,
    equipmentQty: false,
  });

  useEffect(() => {
    if (equipmentData) {
      setEquipmentName(equipmentData.equipment_name);
      setEquipmentDescription(equipmentData.description);
      setEquipmentQty(equipmentData.quantity);
    }
  }, [equipmentData]);

  const showErrorAlert = (message) => {
    // You can customize the alert UI for validation errors here
    alert(message);
  };

  const showSuccessAlert = () => {
    // Show a success message using SweetAlert after successful update
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Equipment details have been successfully updated!',
    });
  };

  const handleSubmitModal = () => {
    // Input validation
    const errors = {
      equipmentName: !equipmentName,
      equipmentDescription: !equipmentDescription,
      equipmentQty: isNaN(equipmentQty) || equipmentQty <= 0,
    };

    setValidationErrors(errors);

    // Check if there are any validation errors
    if (Object.values(errors).some((error) => error)) {
      showErrorAlert('Validation Error: Please enter valid data.');
      return;
    }

    const updatedEquipment = {
      equipment_id: equipmentData.equipment_id,
      equipment_name: equipmentName,
      description: equipmentDescription,
      quantity: equipmentQty,
    };

    fetch(`http://localhost:4000/api/equipment/updateEquipment/${equipmentData.equipment_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEquipment),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setEquipmentData(data);
        showSuccessAlert(); // Show the success message using SweetAlert
      })
      .catch((error) => {
        console.error('Error updating equipment data:', error);
        showErrorAlert('Error: Failed to update equipment details. Please try again.');
      });

    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          sx={{ position: 'absolute', top: '10px', right: '10px' }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>
          Update Equipment
        </Typography>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <InputLabel htmlFor="equipmentName">Equipment Name</InputLabel>
            <Input
              value={equipmentName}
              onChange={(e) => setEquipmentName(e.target.value)}
              placeholder="Enter equipment name"
              sx={{ width: '100%' }}
              error={validationErrors.equipmentName}
            />
            {validationErrors.equipmentName && <div style={{ color: 'red' }}>Equipment name is required</div>}
          </div>
          <div>
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
          <div>
            <InputLabel htmlFor="equipmentQty">Equipment Quantity</InputLabel>
            <Input
              type="number"
              value={equipmentQty}
              onChange={(e) => setEquipmentQty(e.target.value)}
              placeholder="Enter Quantity"
              sx={{ width: '100%' }}
              error={validationErrors.equipmentQty}
            />
            {validationErrors.equipmentQty && <div style={{ color: 'red' }}>Please enter a valid quantity</div>}
          </div>
          <Button
            onClick={handleSubmitModal}
            variant="contained"
            style={{ backgroundColor: '#f59e0b' }}
          >
            Save Changes
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditEModal;
