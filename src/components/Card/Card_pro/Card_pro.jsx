import React, { useState } from 'react';
import "../card.css";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'background.paper',
  boxShadow: 24,
  p: 20,
};

export const CardFirst = () => {
  const [modalContent, setModalContent] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (content) => {
    setModalContent(content);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modalContent && modalContent.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalContent && modalContent.description}
          </Typography>
        </Box>
      </Modal>

      <div className="card_1" onClick={() => handleOpen({ title: "Project Information", description: "Content for Project Information" })}>
        <h4>Project Information</h4>
      </div>
      <div className="card_1" onClick={() => handleOpen({ title: "Allocated Equipments", description: "Content for Allocated Equipments" })}>
        <h4>Allocated Equipments</h4>
      </div>
      <div className="card_1" onClick={() => handleOpen({ title: "Workers of the day", description: "Content for Workers of the day" })}>
        <h4>Workers of the day</h4>
      </div>
    </>
  );
}
