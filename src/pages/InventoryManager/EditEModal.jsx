import React, { useState, useEffect } from 'react';
import { Modal, Input, InputLabel, Typography, Button, Box } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
};

const EditEModal = ({ isOpen, onClose, equipmentData, setEquipmentData }) => {

  const [equipmentName, setEquipmentName] = useState('');
  const [equipmentDescription, setEquipmentDescription] = useState('');
  const [equipmentQty, setEquipmentQty] = useState('');
  const [equipmentImage, setEquipmentImage] = useState(null);

  useEffect(() => {
    // Check if materialData is provided and update the state variables accordingly
    if (equipmentData) {
      setEquipmentName(equipmentData.equip_name);
      setEquipmentDescription(equipmentData.equip_description);
      setEquipmentQty(equipmentData.equip_qty);
      setEquipmentImage(equipmentData.equip_image_url);
      // Note: You might want to handle materialImage differently, depending on how it's stored.
      // If it's a URL or file name, you can set it here as well.
    }
  }, [equipmentData]);

  const handleSubmitModal = () => {
    // Input validation
    if (!equipmentName || !equipmentDescription || isNaN(equipmentQty) || equipmentQty <= 0) {
      alert('Please enter valid data.');
      return;
    }

    // Prepare the updated material data
    const updatedEquipments = {
      equip_id: equipmentData.equip_id,
      equip_name: equipmentName,
      equip_description: equipmentDescription,
      equip_qty: equipmentQty,
      equip_image_url: equipmentImage ? equipmentImage.name : '', // Assuming you want to update the image name
    };

    // Make an HTTP request to update the material data
    fetch(`http://localhost:4000/api/equipments/updateEquipments/${equipmentData.equip_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEquipments),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Update the material data in the state with the updated data
        setEquipmentData(data);
      })
      .catch((error) => {
        console.error('Error updating equipments data:', error);
        // Handle the error gracefully, e.g., show an error message to the user.
      });

    // Close the modal
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h4">Edit Equipments</Typography>
        <Input
          value={equipmentName}
          onChange={(e) => setEquipmentName(e.target.value)}
          placeholder="Enter equipment name"
        />
        <Input
          value={equipmentDescription}
          onChange={(e) => setEquipmentDescription(e.target.value)}
          placeholder="Enter Description"
        />
        <Input
          type="number"
          value={equipmentQty}
          onChange={(e) => setEquipmentQty(e.target.value)}
          placeholder="Enter Quantity"
        />
        <InputLabel>Choose an image</InputLabel>
        <Input
          type="file"
          onChange={(e) => setEquipmentImage(e.target.files[0])}
          accept=".jpg, .png, .jpeg"
        />
        {equipmentImage && <Typography>Selected file: {equipmentImage.name}</Typography>}
        <Button
          onClick={handleSubmitModal}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Save Changes
        </Button>
      </Box>
    </Modal>
  );
};

export default EditEModal;
