import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Buttons from "./Buttons";

const ConfirmationdModal = ({
  confirmModal,
  text,
  closeConfirmationModal,
  submit,
}) => {
  const style = {
    position: "absolute",
    marginLeft: "150px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    p: 4,
  };
  return (
    <>
      <div className="confirmation-modal">
        <Modal
          open={confirmModal}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={style}>
            <h1
              style={{
                textAlign: "center",
                fontSizeAdjust: "16px",
                fontWeight: "600",
              }}
              id="child-modal-description"
            >
              {text}{" "}
            </h1>
            <div className="two-btns">
              <Buttons
                type={"button"}
                color={"red"}
                text={"Cancel"}
                onClick={closeConfirmationModal}
              />
              <Buttons
                type={"button"}
                color={"green"}
                text={"Create"}
                onClick={submit}
              />
            </div>
            {/* <Button onClick={handleClose}>Close Child Modal</Button> */}
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default ConfirmationdModal;
