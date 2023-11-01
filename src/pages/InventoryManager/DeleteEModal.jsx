import React, { useState } from "react";
import { Modal, Typography, Button, Box } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
  borderRadius: "10px",
  p: 4,
};

const DeleteEModal = ({ isOpen, onClose, equipmentData, onDelete }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = () => {
    setDeleting(true);

    // Make an HTTP request to delete the equipment data
    fetch(`http://localhost:4000/api/equipment/deletEquipment/${equipmentData.equipment_id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Notify the parent component that the equipment has been deleted
        onDelete();
      })
      .catch((error) => {
        console.error("Error deleting equipment:", error);
        // Handle the error gracefully, e.g., show an error message to the user.
      })
      .finally(() => {
        setDeleting(false);
        onClose();
      });
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h4">Delete Equipment</Typography>
        <Typography sx={{ margin: "20px 0" }}>
          Are you sure you want to delete the equipment:{" "}
          <strong>{equipmentData.item_name}</strong>?
        </Typography>
        <Button
          onClick={handleDelete}
          variant="contained"
          style={{ backgroundColor: "#f59e0b" }} 
          sx={{ marginRight: "10px" }}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete"}
        </Button>
        <Button onClick={onClose} variant="outlined" color="primary">
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default DeleteEModal;
