import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "../../../CSS/kanbanBoard.css";
import { TodoCard } from '../../../components/Card/TodoCard';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';




export const Todo = (props) =>{
    const [cards, setCards] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

      const handleOpen = (cardId) => {
        
       
    setSelectedCard(cardId);
    setOpen(true);
  };


  

    useEffect(() => {
        const fetchCards = async () => {
          try {
            const response = await axios.get('http://localhost:4000/api/card/viewcard');
             // Replace with your API endpoint to fetch card data

            if (response.status === 200) {
              setCards(response.data);
            }

          } catch (error) {
            console.error("Error fetching card data:", error);
          }
        };
     fetchCards();
      }, []);


  return (
    
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
    <ModalDialog
      aria-labelledby="nested-modal-title"
      aria-describedby="nested-modal-description"
      sx={(theme) => ({
        [theme.breakpoints.only('xs')]: {
          top: 'unset',
          bottom: 0,
          left: 0,
          right: 0,
          borderRadius: 0,
          transform: 'none',
          maxWidth: 'unset',
        },
      })}
    >
      <Typography id="nested-modal-title" level="h2">
       Do you want to decline the task?
      </Typography>
      <Typography id="nested-modal-description" textColor="text.tertiary">
       
      </Typography>
      <Box
        sx={{
          mt: 1,
          display: 'flex',
          gap: 1,
          flexDirection: { xs: 'column', sm: 'row-reverse' },
        }}
      >
        <Button variant="solid" color="neutral" onClick={() => setOpen(false)}>
          Continue
        </Button>
        <Button
          variant="outlined"
          color="neutral"
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
            key={item.id}
            card={[item.id ,item.f_name]}
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
  )
}
