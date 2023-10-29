import React, { useState, useEffect } from 'react';
import { Modal, Input, InputLabel, Typography, Button, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import the Close icon
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

const EditModal = ({ isOpen, onClose, materialData, setMaterialData }) => {
  const [materialName, setMaterialName] = useState('');
  const [materialDescription, setMaterialDescription] = useState('');
  const [materialQty, setMaterialQty] = useState('');
  const [materialType, setMaterialType] = useState('');
  const [materialPreLevel, setMaterialPreLevel] = useState('');

  useEffect(() => {
    // Check if materialData is provided and update the state variables accordingly
    if (materialData) {
      setMaterialName(materialData.material_name);
      setMaterialDescription(materialData.description);
      setMaterialQty(materialData.quantity);
      setMaterialType(materialData.type);
      setMaterialPreLevel(materialData.preorder_level);
    }
  }, [materialData]);

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

    // Prepare the updated material data
    const updatedMaterial = {
      material_id: materialData.material_id,
      material_name: materialName,
      description: materialDescription,
      quantity: materialQty,
      type: materialType,
      preorder_level: materialPreLevel,
    };

    // Make an HTTP request to update the material data
    fetch(`http://localhost:4000/api/material/updateMaterial/${materialData.material_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMaterial),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Update the local state with the updated data
        setMaterialName(data.material_name);
        setMaterialDescription(data.description);
        setMaterialQty(data.quantity);
        setMaterialType(data.type);
        setMaterialPreLevel(data.preorder_level);

        // Display a success message using SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Material details have been successfully updated!',
        });
      })
      .catch((error) => {
        console.error('Error updating material data:', error);
        // Handle the error gracefully, e.g., show an error message to the user.
        // You can also display an error message using SweetAlert if needed.
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update material details. Please try again.',
        });
      });

    // Close the modal
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
          Update Material
        </Typography>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div>
            <InputLabel htmlFor="materialName">Material Name</InputLabel>
            <Input
              value={materialName}
              onChange={(e) => setMaterialName(e.target.value)}
              placeholder="Enter material name"
              sx={{ width: '100%' }}
            />
          </div>
          <div>
            <InputLabel htmlFor="materialDescription">Material Description</InputLabel>
            <Input
              value={materialDescription}
              onChange={(e) => setMaterialDescription(e.target.value)}
              placeholder="Enter Description"
              sx={{ width: '100%' }}
            />
          </div>
          <div>
            <InputLabel htmlFor="materialQty">Material Quantity</InputLabel>
            <Input
              type="number"
              value={materialQty}
              onChange={(e) => setMaterialQty(e.target.value)}
              placeholder="Enter Quantity"
              sx={{ width: '100%' }}
            />
          </div>
          <div>
            <InputLabel htmlFor="materialType">Material Type</InputLabel>
            <Input
              value={materialType}
              onChange={(e) => setMaterialType(e.target.value)}
              placeholder="Enter material Type"
              sx={{ width: '100%' }}
            />
          </div>
          <div>
            <InputLabel htmlFor="materialPreLevel">Pre Order Level</InputLabel>
            <Input
              type="number"
              value={materialPreLevel}
              onChange={(e) => setMaterialPreLevel(e.target.value)}
              placeholder="Enter Pre Oreder Level"
              sx={{ width: '100%' }}
            />
          </div>
          <Button
            onClick={handleSubmitModal}
            variant="contained"
            style={{ backgroundColor: "#f59e0b" }}
          >
            Save Changes
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditModal;
