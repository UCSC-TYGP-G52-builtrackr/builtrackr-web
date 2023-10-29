import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert
import { Modal, Input, InputLabel, Typography, Button, Box } from '@mui/material';

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
  const [materialType, setMaterialType] = useState('');
  const [materialPreLevel, setMaterialPreLevel] = useState('');

  const handleSubmitModal = () => {
    // Input validation
    if (!materialName || !materialDescription || isNaN(materialQty) || materialQty <= 0 || isNaN(materialPreLevel)) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please enter valid data.',
      });
      return;
    }

    // Prepare the new material data
    const newMaterial = {
      material_name: materialName,
      description: materialDescription,
      quantity: materialQty,
      type: materialType,
      preorder_level: materialPreLevel,
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

        // Show success message with SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Your material has been successfully added.',
        });

        // Close the modal
        onClose();
      })
      .catch((error) => {
        console.error('Error adding material data:', error);
      });
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
            <InputLabel htmlFor="materialType">Material Type</InputLabel>
            <Input
              value={materialType}
              onChange={(e) => setMaterialType(e.target.value)}
              placeholder="Enter Material Type"
              sx={{ width: '100%' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <InputLabel htmlFor="materialPreLevel">Pre Order Level</InputLabel>
            <Input
              type="number"
              value={materialPreLevel}
              onChange={(e) => setMaterialPreLevel(e.target.value)}
              placeholder="Enter Pre Order Level"
              sx={{ width: '100%' }}
            />
          </div>
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
