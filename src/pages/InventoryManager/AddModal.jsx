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

const AddModal = ({ isOpen, onClose, setMaterialData }) => {
  const [materialName, setMaterialName] = useState('');
  const [materialDescription, setMaterialDescription] = useState('');
  const [materialQty, setMaterialQty] = useState('');
  const [materialImage, setMaterialImage] = useState(null);

  const handleSubmitModal = () => {
    // Input validation
    if (!materialName || !materialDescription || isNaN(materialQty) || materialQty <= 0) {
      alert('Please enter valid data.');
      return;
    }

    // Prepare the new material data
    const newMaterial = {
      item_name: materialName,
      description: materialDescription,
      quantity: materialQty,
      photo_path: materialImage ? materialImage.name : '',
    };

    // Make an HTTP request to add the material data
    fetch('http://localhost:4000/api/material/addMaterial', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMaterial),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Update the material data in the state with the added data
        setMaterialData((prevMaterialData) => [...prevMaterialData, data]);
      })
      .catch((error) => {
        console.error('Error adding material data:', error);
      });

    // Close the modal
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h4" style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>
          Add Material
        </Typography>
        <form>
          <div style={{ marginBottom: '20px' }}>
            <InputLabel htmlFor="materialName">Material Name</InputLabel>
            <Input
              value={materialName}
              onChange={(e) => setMaterialName(e.target.value)}
              placeholder="Enter material name"
              sx={{ width: '100%' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <InputLabel htmlFor="materialDescription">Material Description</InputLabel>
            <Input
              value={materialDescription}
              onChange={(e) => setMaterialDescription(e.target.value)}
              placeholder="Enter Description"
              sx={{ width: '100%' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <InputLabel htmlFor="materialQty">Material Quantity</InputLabel>
            <Input
              type="number"
              value={materialQty}
              onChange={(e) => setMaterialQty(e.target.value)}
              placeholder="Enter Quantity"
              sx={{ width: '100%' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <InputLabel>Choose an image</InputLabel>
            <Input
              type="file"
              onChange={(e) => setMaterialImage(e.target.files[0])}
              accept=".jpg, .png, .jpeg"
              sx={{ width: '100%' }}
            />
          </div>
          {materialImage && (
            <Typography>Selected file: {materialImage.name}</Typography>
          )}
          <Button
            onClick={handleSubmitModal}
            variant="contained"
            style={{ backgroundColor: "#f59e0b" }}
          >
            Add Material
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddModal;
