import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../CSS/kanbanBoard.css";
import { TodoCard } from "../../../components/Card/TodoCard";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";

export const Todo = (props) => {
  const [cards, setCards] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleOpen = (cardId) => {
    setSelectedCard(cardId);
    console.log(selectedCard)
    setOpen(true);
  };

  //get site_id from local storage
  const siteId = localStorage.getItem("site_id");
  console.log("id in to do",siteId);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/card/viewcard?siteId=${siteId}`
        );
          setCards(response.data);
          console.log(response.data);

      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };
    fetchCards();
  }, [siteId]);

const handleDecline = async (id) => {
  console.log(id);
  try {
    const response = await axios.post(
      `http://localhost:4000/api/card/declineId?id=${id}`
    );
    console.log(response.status);
    if (response.status === 200) {
      setOpen(false);
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
}

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="nested-modal-title"
          aria-describedby="nested-modal-description"
          sx={(theme) => ({
            [theme.breakpoints.only("xs")]: {
              top: "unset",
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 0,
              transform: "none",
              maxWidth: "unset",
            },
          })}
        >
          <Typography id="nested-modal-title" level="h2">
            Do you want to decline the task?
          </Typography>
          <Typography
            id="nested-modal-description"
            textColor="text.tertiary"
          ></Typography>
          <Box
            sx={{
              mt: 1,
              display: "flex",
              gap: 1,
              flexDirection: { xs: "column", sm: "row-reverse" },
            }}
          >
            
             <Button 
      colorScheme="blue"
            style={{
              backgroundColor: "#ffcc00",
              border: "none",
              color: "black",
              padding: "5px 10px",
              fontSize: "16px",
              borderRadius: "4px",
              boxShadow: "0 2px 0px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
              transition: "background-color 0.3s, box-shadow 0.3s",
              marginLeft: "8%",
              marginTop: "5%",
            }}
      
           onClick={() => handleDecline(selectedCard)}>Decline</Button>
            <Button
             colorScheme="blue"
             style={{
               backgroundColor: "#fffffe",
               border: "none",
               color: "black",
               fontSize: "16px",
               borderRadius: "4px",
               cursor: "pointer",
               marginLeft: "8%",
               marginTop: "5%",
               boxShadow: "0 1px 1px 1px rgba(0, 0, 0, 0.2)",
             }}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </Box>
        </ModalDialog>
      </Modal>

      <div className="board">
        <div className="board_top">
          <p className="board_top_title">
            To do
            <span>{`${cards.length || 0}`}</span>
          </p>
        </div>
        <div className="board_cards custom-scroll">
          {cards.map((item) => (
            <TodoCard
              key={item.task_id}
              card={[item.task_id, item.taskname]}
              removeCard={props.removeCard}
              boardId={props.board?.task_id}
              dragEnded={props.dragEnded}
              dragEntered={props.dragEntered}
              updateCard={props.updateCard}
              onClick={() => handleOpen(item.task_id)}
            />
          ))}
        </div>
      </div>
    </>
  );
};
