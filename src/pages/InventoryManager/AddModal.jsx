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
      photo_path: materialImage ? materialImage.name : '', // Assuming you want to update the image name
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
        // Handle the error gracefully, e.g., show an error message to the user.
      });

    // Close the modal
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h4">Add Material</Typography>
        <Input
          value={materialName}
          onChange={(e) => setMaterialName(e.target.value)}
          placeholder="Enter material name"
        />
        <Input
          value={materialDescription}
          onChange={(e) => setMaterialDescription(e.target.value)}
          placeholder="Enter Description"
        />
        <Input
          type="number"
          value={materialQty}
          onChange={(e) => setMaterialQty(e.target.value)}
          placeholder="Enter Quantity"
        />
        <InputLabel>Choose an image</InputLabel>
        <Input
          type="file"
          onChange={(e) => setMaterialImage(e.target.files[0])}
          accept=".jpg, .png, .jpeg"
        />
        {materialImage && <Typography>Selected file: {materialImage.name}</Typography>}
        <Button
  onClick={handleSubmitModal}
  variant="contained"
  color="primary"
  sx={{ mt: 2 }}
>
  Add Material
</Button>

      </Box>
    </Modal>
  );
};

export default AddModal;


// import React, { useState } from 'react';
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

// const AddModal = ({ isOpen, onClose, setMaterialData }) => {
//   const [materialName, setMaterialName] = useState('');
//   const [materialDescription, setMaterialDescription] = useState('');
//   const [materialQty, setMaterialQty] = useState('');
//   const [materialImage, setMaterialImage] = useState(null);

//   const handleSubmitModal = () => {
//     // Input validation
//     if (!materialName || !materialDescription || isNaN(materialQty) || materialQty <= 0) {
//       alert('Please enter valid data.');
//       return;
//     }

//     // Prepare the new material data
//     const newMaterial = {
//       item_name: materialName,
//       description: materialDescription,
//       quantity: materialQty,
//       photo_path: materialImage ? materialImage.name : '', // Assuming you want to update the image name
//     };

//     // Make an HTTP request to add the material data
//     fetch('http://localhost:4000/api/material/addMaterial', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newMaterial),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         // Update the material data in the state with the added data
//         setMaterialData((prevMaterialData) => [...prevMaterialData, data]);
//       })
//       .catch((error) => {
//         console.error('Error adding material data:', error);
//         // Handle the error gracefully, e.g., show an error message to the user.
//       });

//     // Close the modal
//     onClose();
//   };

//   return (
//     <Modal open={isOpen} onClose={onClose}>
//       <Box sx={style}>
//         <Typography variant="h4">Add Material</Typography>
//         <Input
//           value={materialName}
//           onChange={(e) => setMaterialName(e.target.value)}
//           placeholder="Enter material name"
//         />
//         <Input
//           value={materialDescription}
//           onChange={(e) => setMaterialDescription(e.target.value)}
//           placeholder="Enter Description"
//         />
//         <Input
//           type="number"
//           value={materialQty}
//           onChange={(e) => setMaterialQty(e.target.value)}
//           placeholder="Enter Quantity"
//         />
//         <InputLabel>Choose an image</InputLabel>
//         <Input
//           type="file"
//           onChange={(e) => setMaterialImage(e.target.files[0])}
//           accept=".jpg, .png, .jpeg"
//         />
//         {materialImage && <Typography>Selected file: {materialImage.name}</Typography>}
//         <Button
//           onClick={handleSubmitModal}
//           variant="contained"
//           color="primary"
//           sx={{ mt: 2 }}
//         >
//           Add Material
//         </Button>
//       </Box>
//     </Modal>
//   );
// };

// export default AddModal;

// import React, { useState } from 'react';
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

// const AddModal = ({ isOpen, onClose, setMaterialData }) => {

//   const [materialName, setMaterialName] = useState('');
//   const [materialDescription, setMaterialDescription] = useState('');
//   const [materialQty, setMaterialQty] = useState('');
//   const [materialImage, setMaterialImage] = useState(null);

//   const handleSubmitModal = () => {
//     // Input validation
//     if (!materialName || !materialDescription || isNaN(materialQty) || materialQty <= 0) {
//       alert('Please enter valid data.');
//       return;
//     }

//     // Prepare the new material data
//     const newMaterial = {
//       item_name: materialName,
//       description: materialDescription,
//       quantity: materialQty,
//       photo_path: materialImage ? materialImage.name : '', // Assuming you want to update the image name
//     };

//     // Make an HTTP request to add the material data
//     fetch('http://localhost:4000/api/material/addMaterial', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newMaterial),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         // Update the material data in the state with the added data
//         setMaterialData((prevMaterialData) => [...prevMaterialData, data]);
//       })
//       .catch((error) => {
//         console.error('Error adding material data:', error);
//         // Handle the error gracefully, e.g., show an error message to the user.
//       });

//     // Close the modal
//     onClose();
//   };

//   return (
//     <Modal open={isOpen} onClose={onClose}>
//       <Box sx={style}>
//         <Typography variant="h4">Add Material</Typography>
//         <Input
//           value={materialName}
//           onChange={(e) => setMaterialName(e.target.value)}
//           placeholder="Enter material name"
//         />
//         <Input
//           value={materialDescription}
//           onChange={(e) => setMaterialDescription(e.target.value)}
//           placeholder="Enter Description"
//         />
//         <Input
//           type="number"
//           value={materialQty}
//           onChange={(e) => setMaterialQty(e.target.value)}
//           placeholder="Enter Quantity"
//         />
//         <InputLabel>Choose an image</InputLabel>
//         <Input
//           type="file"
//           onChange={(e) => setMaterialImage(e.target.files[0])}
//           accept=".jpg, .png, .jpeg"
//         />
//         {materialImage && <Typography>Selected file: {materialImage.name}</Typography>}
//         <Button
//           onClick={handleSubmitModal}
//           variant="contained"
//           color="primary"
//           sx={{ mt: 2 }}
//         >
//           Add Material
//         </Button>
//       </Box>
//     </Modal>
//   );
// };

// export default AddModal;
// import React, { useState } from "react";
// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Input from "@mui/material/Input";
// import InputLabel from "@mui/material/InputLabel";
// import FormControl from "@mui/material/FormControl";

// const AddModal = ({ isOpen, onClose, setMaterialData }) => {
//   const [categoryName, setCategoryName] = useState("");
//   const [categoryDescription, setCategoryDescription] = useState("");
//   const [categoryQuantity, setCategoryQuantity] = useState("");
//   const [categoryImage, setCategoryImage] = useState("");

//   const handleSubmit = () => {
//     // Perform any validation here if needed

//     // Create a new material object with the entered data
//     const newMaterial = {
//       item_name: categoryName,
//       description: categoryDescription,
//       quantity: categoryQuantity,
//       photo_path: categoryImage,
//     };

//     // Call a function to add the new material
//     // This is where you should make an API request to add the material to the database
//     // After successfully adding the material, you can update the state with the new data

//     setMaterialData(newMaterial); // Update the state with the new material

//     // Clear the form fields
//     setCategoryName("");
//     setCategoryDescription("");
//     setCategoryQuantity("");
//     setCategoryImage("");

//     // Close the modal
//     onClose();
//   };

//   return (
//     <Modal open={isOpen} onClose={onClose}>
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: 400,
//           bgcolor: "background.paper",
//           boxShadow: 24,
//           p: 4,
//         }}
//       >
//         <Typography variant="h5" align="center" gutterBottom>
//           Add a Material
//         </Typography>
//         <FormControl fullWidth margin="normal">
//           <InputLabel htmlFor="categoryName">Item Name</InputLabel>
//           <Input
//             id="categoryName"
//             type="text"
//             value={categoryName}
//             onChange={(e) => setCategoryName(e.target.value)}
//           />
//         </FormControl>
//         <FormControl fullWidth margin="normal">
//           <InputLabel htmlFor="categoryDescription">Description</InputLabel>
//           <Input
//             id="categoryDescription"
//             type="text"
//             value={categoryDescription}
//             onChange={(e) => setCategoryDescription(e.target.value)}
//           />
//         </FormControl>
//         <FormControl fullWidth margin="normal">
//           <InputLabel htmlFor="categoryQuantity">Quantity</InputLabel>
//           <Input
//             id="categoryQuantity"
//             type="number"
//             value={categoryQuantity}
//             onChange={(e) => setCategoryQuantity(e.target.value)}
//           />
//         </FormControl>
//         <FormControl fullWidth margin="normal">
//           <InputLabel htmlFor="categoryImage">Image URL</InputLabel>
//           <Input
//             id="categoryImage"
//             type="text"
//             value={categoryImage}
//             onChange={(e) => setCategoryImage(e.target.value)}
//           />
//         </FormControl>
//         <div style={{ display: "flex", justifyContent: "center" }}>
//           <button
//             type="button"
//             onClick={handleSubmit}
//             style={{ backgroundColor: "#FFCC00", marginTop: "20px" }}
//           >
//             Add Material
//           </button>
//         </div>
//       </Box>
//     </Modal>
//   );
// };

// export default AddModal;
