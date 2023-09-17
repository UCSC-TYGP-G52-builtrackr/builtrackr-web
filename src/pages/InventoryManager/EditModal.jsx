import React, { useState, useEffect } from 'react';
import { Modal, Input, InputLabel, Typography, Button, Box } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
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
        <Typography variant="h4">Edit Material</Typography>
        <Input
          value={materialName}
          onChange={(e) => setMaterialName(e.target.value)}
          placeholder="Enter material name"
          sx={{ margin: '10px 0' }}
        />
        <Input
          value={materialDescription}
          onChange={(e) => setMaterialDescription(e.target.value)}
          placeholder="Enter Description"
          sx={{ margin: '10px 0' }}
        />
        <Input
          type="number"
          value={materialQty}
          onChange={(e) => setMaterialQty(e.target.value)}
          placeholder="Enter Quantity"
          sx={{ margin: '10px 0' }}
        />
        <InputLabel sx={{ margin: '10px 0' }}>Choose an image</InputLabel>
        <Input
          type="file"
          onChange={(e) => setMaterialImage(e.target.files[0])}
          accept=".jpg, .png, .jpeg"
          sx={{ margin: '10px 0' }}
        />
        {materialImage && <Typography sx={{ margin: '10px 0' }}>Selected file: {materialImage.name}</Typography>}
        <Button
          onClick={handleSubmitModal}
          variant="contained"
          color="primary"
          sx={{ margin: '20px 0' }}
        >
          Save Changes
        </Button>
      </Box>
    </Modal>
  );
};

export default EditModal;
