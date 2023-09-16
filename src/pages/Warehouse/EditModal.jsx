import React, { useState } from 'react';
import { FormControl, Modal, Input,InputLabel } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: 'white',
    boxShadow: 24,
    p: 10,
  };

const EditModal = ({ isOpen, onClose }) => {
  // Create state variables for the modal content
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryQuantity, setCategoryQuantity] = useState('');
  const [categoryImage, setCategoryImage] = useState('');

  // Event handler for submitting the modal and updating the category
  const handleSubmitModal = () => {
    // You can add the logic here to update the category with the new data
    // For example, dispatch an action to update the category in your state management system
    // and then close the modal
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      {/* Modal content */}
      <Box sx={{ ...style, width:'500px',paddingTop:"50px" ,padding:"100px", bgColor:'white' }}>
      
        <div className="modal-content">
          <Typography variant="h4">Edit Category</Typography><br/>
          <FormControl>
            <InputLabel>Enter category name</InputLabel>
          <Input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
          />
          </FormControl><br/><br/>
          <FormControl>
          <InputLabel>Description</InputLabel>
          <Input
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
            placeholder="Enter Description"
          />
          </FormControl><br/><br/>
          <FormControl>
            <InputLabel>Quantity</InputLabel>
          <Input
            type="Number"
            value={categoryQuantity}
            onChange={(e) => setCategoryQuantity(e.target.value)}
            placeholder="Enter Quantity"
          />
          </FormControl><br/><br/><br/>
          <FormControl>
            
          <Input
                type="file"
                value={categoryImage}
                onChange={(e) => setCategoryImage(e.target.files[0].name)}
                accept=".jpg, .png, .jpeg"
              />
              </FormControl><br /><br/>
<br/>
<FormControl>
          <button onClick={handleSubmitModal} style = {{backgroundColor:"#FFCC00" , padding:"5%" , width:"150px"}}>Save Changes</button> 
          </FormControl>   
        </div>
  
      </Box>
    </Modal>
  );
};

export default EditModal;
