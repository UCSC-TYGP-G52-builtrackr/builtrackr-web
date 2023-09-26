import React, { useState } from 'react';
import { Modal, Input, InputLabel, Typography, Button, Box, Select, MenuItem } from '@mui/material';

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
  const [equipmentImage, setEquipmentImage] = useState(null);

  const handleSubmitModal = () => {
    // Input validation
    if (!equipmentName || !equipmentDescription || isNaN(equipmentQty) || equipmentQty <= 0) {
      alert('Please enter valid data.');
      return;
    }

    // Prepare the new equipment data
    const newEquipment = {
      item_name: equipmentName,
      description: equipmentDescription,
      quantity: equipmentQty,
      photo_path: equipmentImage ? equipmentImage.name : '',
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
      })
      .catch((error) => {
        console.error('Error adding equipment data:', error);
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
          <div style={{ marginBottom: '20px' }}>
            <InputLabel>Choose an image</InputLabel>
            <Input
              type="file"
              onChange={(e) => setEquipmentImage(e.target.files[0])}
              accept=".jpg, .png, .jpeg"
              sx={{ width: '100%' }}
            />
          </div>
          {equipmentImage && (
            <Typography>Selected file: {equipmentImage.name}</Typography>
          )}
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
