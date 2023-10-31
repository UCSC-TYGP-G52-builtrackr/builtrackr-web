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
  width: 500,
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

  const [validationErrors, setValidationErrors] = useState({
    materialName: false,
    materialDescription: false,
    materialType: false,
    materialQty: false,
    materialPreLevel: false,
  });

  const handleSubmitModal = () => {
    // Input validation
    let hasError = false;
    if (!materialName) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        materialName: true,
      }));
      hasError = true;
    } else {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        materialName: false,
      }));
    }

    if (!materialDescription) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        materialDescription: true,
      }));
      hasError = true;
    } else {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        materialDescription: false,
      }));
    }

    if (!materialType) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        materialType: true,
      }));
      hasError = true;
    } else {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        materialType: false,
      }));
    }

    if (isNaN(materialQty) || materialQty <= 0) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        materialQty: true,
      }));
      hasError = true;
    } else {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        materialQty: false,
      }));
    }

    if (isNaN(materialPreLevel) || materialPreLevel <= 0) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        materialPreLevel: true,
      }));
      hasError = true;
    } else {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        materialPreLevel: false,
      }));
    }

    if (hasError) {
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

        // Show a success message using SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Material Item has been successfully added!',
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
        <IconButton
          style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}
          onClick={onClose}
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>
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
              error={validationErrors.materialName}
            />
            {validationErrors.materialName && (
              <div style={{ color: 'red' }}>Material name is required</div>
            )}
          </div>
          <div style={{ marginBottom: '20px' }}>
            <InputLabel htmlFor="materialDescription">Material Description</InputLabel>
            <Input
              value={materialDescription}
              onChange={(e) => setMaterialDescription(e.target.value)}
              placeholder="Enter Description"
              sx={{ width: '100%' }}
              error={validationErrors.materialDescription}
            />
            {validationErrors.materialDescription && (
              <div style={{ color: 'red' }}>Material description is required</div>
            )}
          </div>
          <div style={{ marginBottom: '20px' }}>
            <InputLabel htmlFor="materialQty">Material Quantity</InputLabel>
            <Input
              type="number"
              value={materialQty}
              onChange={(e) => setMaterialQty(e.target.value)}
              placeholder="Enter Quantity"
              sx={{ width: '100%' }}
              error={validationErrors.materialQty}
            />
            {validationErrors.materialQty && (
              <div style={{ color: 'red' }}>Please enter a valid quantity</div>
            )}
          </div>
          <div style={{ marginBottom: '20px' }}>
            <InputLabel htmlFor="materialType">Material Type</InputLabel>
            <Input
              value={materialType}
              onChange={(e) => setMaterialType(e.target.value)}
              placeholder="Enter Material Type"
              sx={{ width: '100%' }}
              error={validationErrors.materialType}
            />
            {validationErrors.materialType && (
              <div style={{ color: 'red' }}>Please enter a valid type</div>
            )}
          </div>
          <div style={{ marginBottom: '20px' }}>
            <InputLabel htmlFor="materialPreLevel">Pre Order Level</InputLabel>
            <Input
              type="number"
              value={materialPreLevel}
              onChange={(e) => setMaterialPreLevel(e.target.value)}
              placeholder="Enter Pre Order Level"
              sx={{ width: '100%' }}
              error={validationErrors.materialPreLevel}
            />
            {validationErrors.materialPreLevel && (
              <div style={{ color: 'red' }}>Please enter a valid pre-order level</div>
            )}
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
