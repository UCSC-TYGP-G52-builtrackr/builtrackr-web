import React from "react";
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

const DeleteModal = ({ isOpen, onClose, materialData, onDelete }) => {
  // Check if materialData is null or undefined
  if (!materialData) {
    return null; // or return a message or an empty modal
  }

  const handleDelete = () => {
    // Make an HTTP request to delete the material data
    fetch(`http://localhost:4000/api/material/deleteMaterial/${materialData.material_id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Notify the parent component that the material has been deleted
        onDelete();
      })
      .catch((error) => {
        console.error("Error deleting material:", error);
        // Handle the error gracefully, e.g., show an error message to the user.
      });

    // Close the modal
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h4">Delete Material</Typography>
        <Typography sx={{ margin: "20px 0" }}>
          Are you sure you want to delete the material:{" "}
          <strong>{materialData.item_name}</strong>?
        </Typography>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="secondary"
          sx={{ marginRight: "10px" }}
        >
          Delete
        </Button>
        <Button onClick={onClose} variant="outlined" color="primary">
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
