import React, { useState, useEffect } from 'react';
import { Modal, Input, InputLabel, Typography, Button, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import the Close icon

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
  const [materialImage, setMaterialImage] = useState(null);

  useEffect(() => {
    // Check if materialData is provided and update the state variables accordingly
    if (materialData) {
      setMaterialName(materialData.item_name);
      setMaterialDescription(materialData.description);
      setMaterialQty(materialData.quantity);
      setMaterialImage(materialData.photo_path);
      // Note: You might want to handle materialImage differently, depending on how it's stored.
      // If it's a URL or file name, you can set it here as well.
    }
  }, [materialData]);

  const handleSubmitModal = () => {
    // Input validation
    if (!materialName || !materialDescription || isNaN(materialQty) || materialQty <= 0) {
      alert('Please enter valid data.');
      return;
    }

    // Prepare the updated material data
    const updatedMaterial = {
      material_id: materialData.material_id,
      item_name: materialName,
      description: materialDescription,
      quantity: materialQty,
      photo_path: materialImage ? materialImage.name : '', // Assuming you want to update the image name
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
        // Update the material data in the state with the updated data
        setMaterialData(data);
      })
      .catch((error) => {
        console.error('Error updating material data:', error);
        // Handle the error gracefully, e.g., show an error message to the user.
      });

    // Close the modal
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <IconButton
          edge="end" // Position the icon on the top right corner
          color="inherit"
          onClick={onClose}
          sx={{ position: 'absolute', top: '10px', right: '10px' }} // Position the icon
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>
          Update Material
        </Typography>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
            <InputLabel>Choose an image</InputLabel>
            <Input
              type="file"
              onChange={(e) => setMaterialImage(e.target.files[0])}
              accept=".jpg, .png, .jpeg"
              sx={{ width: '100%' }}
            />
          </div>
          {materialImage && (
            <Typography sx={{ width: '100%' }}>Selected file: {materialImage.name}</Typography>
          )}
 <Button
  onClick={handleSubmitModal}
  variant="contained"
  style={{ backgroundColor: "#f59e0b" }} // Replace with the correct color code
>
  Save Changes
</Button>




        </form>
      </Box>
    </Modal>
  );
};

export default EditModal;
