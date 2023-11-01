import React, { useState, useEffect } from 'react';
import { Modal, Input, InputLabel, Typography, Button, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2'; // Import SweetAlert
import withReactContent from 'sweetalert2-react-content'; // Import SweetAlert with React support

const MySwal = withReactContent(Swal);

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

  const [validationErrors, setValidationErrors] = useState({
    materialName: false,
    materialDescription: false,
    materialQty: false,
    materialType: false,
    materialPreLevel: false,
  });

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
    const errors = {
      materialName: !materialName,
      materialDescription: !materialDescription,
      materialQty: isNaN(materialQty) || materialQty <= 0,
      materialType: !materialType,
      materialPreLevel: isNaN(materialPreLevel) || materialPreLevel < 0,
    };

    setValidationErrors(errors);

    // Check if there are any validation errors
    if (Object.values(errors).some((error) => error)) {
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
        setMaterialData(data);

        // Show a success message using SweetAlert
        MySwal.fire({
          icon: 'success',
          title: 'Material Details Updated',
          text: 'Material details have been updated successfully.',
        });

        // Close the modal
        onClose();
      })
      .catch((error) => {
        console.error('Error updating material data:', error);
        // Handle the error gracefully, e.g., show an error message to the user.
        alert('Failed to update material details. Please try again.');
      });
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
              error={validationErrors.materialName}
            />
          </div>
          {validationErrors.materialName && <div style={{ color: 'red' }}>Material name is required</div>}
          <div>
            <InputLabel htmlFor="materialDescription">Material Description</InputLabel>
            <Input
              value={materialDescription}
              onChange={(e) => setMaterialDescription(e.target.value)}
              placeholder="Enter Description"
              sx={{ width: '100%' }}
              error={validationErrors.materialDescription}
            />
          </div>
          {validationErrors.materialDescription && <div style={{ color: 'red' }}>Material description is required</div>}
          <div>
            <InputLabel htmlFor="materialQty">Material Quantity</InputLabel>
            <Input
              type="number"
              value={materialQty}
              onChange={(e) => setMaterialQty(e.target.value)}
              placeholder="Enter Quantity"
              sx={{ width: '100%' }}
              error={validationErrors.materialQty}
            />
          </div>
          {validationErrors.materialQty && <div style={{ color: 'red' }}>Please enter a valid quantity</div>}
          <div>
            <InputLabel htmlFor="materialType">Material Type</InputLabel>
            <Input
              value={materialType}
              onChange={(e) => setMaterialType(e.target.value)}
              placeholder="Enter material Type"
              sx={{ width: '100%' }}
              error={validationErrors.materialType}
            />
          </div>
          {validationErrors.materialType && <div style={{ color: 'red' }}>Please enter a valid type</div>}
          <div>
            <InputLabel htmlFor="materialPreLevel">Pre Order Level</InputLabel>
            <Input
              type="number"
              value={materialPreLevel}
              onChange={(e) => setMaterialPreLevel(e.target.value)}
              placeholder="Enter Pre Order Level"
              sx={{ width: '100%' }}
              error={validationErrors.materialPreLevel}
            />
          </div>
          {validationErrors.materialPreLevel && <div style={{ color: 'red' }}>Please enter a valid pre-order level</div>}
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

export default EditModal;
