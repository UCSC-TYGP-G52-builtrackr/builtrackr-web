// import React, { useState, useEffect } from 'react';
// import { Modal, Input, InputLabel, Typography, Button, Box } from '@mui/material';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'white',
//   boxShadow: 24,
//   p: 4,
// };

// const EditEModal = ({ isOpen, onClose, equipmentData, setEquipmentData }) => {

//   const [equipmentName, setEquipmentName] = useState('');
//   const [equipmentDescription, setEquipmentDescription] = useState('');
//   const [equipmentQty, setEquipmentQty] = useState('');
//   const [equipmentImage, setEquipmentImage] = useState(null);

//   useEffect(() => {
//     // Check if materialData is provided and update the state variables accordingly
//     if (equipmentData) {
//       setEquipmentName(equipmentData.equip_name);
//       setEquipmentDescription(equipmentData.equip_description);
//       setEquipmentQty(equipmentData.equip_qty);
//       setEquipmentImage(equipmentData.equip_image_url);
//       // Note: You might want to handle materialImage differently, depending on how it's stored.
//       // If it's a URL or file name, you can set it here as well.
//     }
//   }, [equipmentData]);

//   const handleSubmitModal = () => {
//     // Input validation
//     if (!equipmentName || !equipmentDescription || isNaN(equipmentQty) || equipmentQty <= 0) {
//       alert('Please enter valid data.');
//       return;
//     }

//     // Prepare the updated material data
//     const updatedEquipments = {
//       equip_id: equipmentData.equip_id,
//       equip_name: equipmentName,
//       equip_description: equipmentDescription,
//       equip_qty: equipmentQty,
//       equip_image_url: equipmentImage ? equipmentImage.name : '', // Assuming you want to update the image name
//     };

//     // Make an HTTP request to update the material data
//     fetch(`http://localhost:4000/api/equipments/updateEquipments/${equipmentData.equip_id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedEquipments),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         // Update the material data in the state with the updated data
//         setEquipmentData(data);
//       })
//       .catch((error) => {
//         console.error('Error updating equipments data:', error);
//         // Handle the error gracefully, e.g., show an error message to the user.
//       });

//     // Close the modal
//     onClose();
//   };

//   return (
//     <Modal open={isOpen} onClose={onClose}>
//       <Box sx={style}>
//         <Typography variant="h4">Edit Equipments</Typography>
//         <Input
//           value={equipmentName}
//           onChange={(e) => setEquipmentName(e.target.value)}
//           placeholder="Enter equipment name"
//         />
//         <Input
//           value={equipmentDescription}
//           onChange={(e) => setEquipmentDescription(e.target.value)}
//           placeholder="Enter Description"
//         />
//         <Input
//           type="number"
//           value={equipmentQty}
//           onChange={(e) => setEquipmentQty(e.target.value)}
//           placeholder="Enter Quantity"
//         />
//         <InputLabel>Choose an image</InputLabel>
//         <Input
//           type="file"
//           onChange={(e) => setEquipmentImage(e.target.files[0])}
//           accept=".jpg, .png, .jpeg"
//         />
//         {equipmentImage && <Typography>Selected file: {equipmentImage.name}</Typography>}
//         <Button
//           onClick={handleSubmitModal}
//           variant="contained"
//           color="primary"
//           sx={{ mt: 2 }}
//         >
//           Save Changes
//         </Button>
//       </Box>
//     </Modal>
//   );
// };

// export default EditEModal;


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

const EditEModal = ({ isOpen, onClose, equipmentData, setEquipmentData }) => {
  const [equipmentName, setEquipmentName] = useState('');
  const [equipmentDescription, setEquipmentDescription] = useState('');
  const [equipmentQty, setEquipmentQty] = useState('');
  const [equipmentImage, setEquipmentImage] = useState(null);

  useEffect(() => {
    // Check if equipmentData is provided and update the state variables accordingly
    if (equipmentData) {
      setEquipmentName(equipmentData.item_name);
      setEquipmentDescription(equipmentData.description);
      setEquipmentQty(equipmentData.quantity);
      setEquipmentImage(equipmentData.photo_path);
      // Note: You might want to handle equipmentImage differently, depending on how it's stored.
      // If it's a URL or file name, you can set it here as well.
    }
  }, [equipmentData]);

  const handleSubmitModal = () => {
    // Input validation
    if (!equipmentName || !equipmentDescription || isNaN(equipmentQty) || equipmentQty <= 0) {
      alert('Please enter valid data.');
      return;
    }

    // Prepare the updated equipment data
    const updatedEquipment = {
      equipment_id: equipmentData.equipment_id,
      item_name: equipmentName,
      description: equipmentDescription,
      quantity: equipmentQty,
      photo_path: equipmentImage ? equipmentImage.name : '', // Assuming you want to update the image name
    };

    // Make an HTTP request to update the equipment data
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
        // Update the equipment data in the state with the updated data
        setEquipmentData(data);
      })
      .catch((error) => {
        console.error('Error updating equipment data:', error);
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
            />
          </div>
          <div>
            <InputLabel htmlFor="equipmentDescription">Equipment Description</InputLabel>
            <Input
              value={equipmentDescription}
              onChange={(e) => setEquipmentDescription(e.target.value)}
              placeholder="Enter Description"
              sx={{ width: '100%' }}
            />
          </div>
          <div>
            <InputLabel htmlFor="equipmentQty">Equipment Quantity</InputLabel>
            <Input
              type="number"
              value={equipmentQty}
              onChange={(e) => setEquipmentQty(e.target.value)}
              placeholder="Enter Quantity"
              sx={{ width: '100%' }}
            />
          </div>
          <div>
            <InputLabel>Choose an image</InputLabel>
            <Input
              type="file"
              onChange={(e) => setEquipmentImage(e.target.files[0])}
              accept=".jpg, .png, .jpeg"
              sx={{ width: '100%' }}
            />
          </div>
          {equipmentImage && (
            <Typography sx={{ width: '100%' }}>Selected file: {equipmentImage.name}</Typography>
          )}
          <Button
            onClick={handleSubmitModal}
            variant="contained"
            color="secondary"
          >
            Save Changes
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditEModal;
