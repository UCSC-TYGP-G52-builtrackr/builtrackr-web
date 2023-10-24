import React, { useState, useEffect, useRef } from 'react';
import './card.css';
import { MoreHorizontal, Clock, CheckSquare } from 'react-feather';
import { Dropdown } from '../DropDown/DropDown';
import { CardInfo } from './CardInfo/CardInfo';
import axios from 'axios';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

export const Card = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef();
  const [values, setValues] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutsideDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideDropdown);

    return () => {
      document.removeEventListener('click', handleClickOutsideDropdown);
    };
  }, []);

  const { id, title, date, tasks } = props.card;

  const formatDate = (value) => {
    if (!value) return '';
    const date = new Date(value);
    if (!date) return '';

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    return day + ' ' + month;
  };

  const handleCardClick = () => {
    if (!showDropdown) {
      setShowModal(true);
    }
  };

  // Delete the card
  const handleDeleteCard = () => {
    const cardId = props.card.id;

    const data = { cardId };
    axios
      .delete(`http://localhost:4000/api/kanbanbord/deleteCard/${cardId}`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetchCardInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/cardInfo/getLabel`
        );
        if (response.status === 200) {
          console.log(response.data);
          setValues(response.data);
        }
      } catch (error) {
        console.error('Error fetching card data:', error);
      }
    };
    fetchCardInfo();
  }, []);

  const filteredCards = values.filter((card) => card.CardId === props.card?.id);

  return (
    <>
      <div
        className="card"
        draggable="true"
        onDragEnd={() => props.dragEnded(props.boardId, id)}
        onDragEnter={() => props.dragEntered(props.boardId, id)}
      >
        <div className="card_title">
          <div className="card_top_labels">
            {filteredCards?.map((item) => (
              <label
                key={item.id}
                style={{ backgroundColor: item.color, fontSize: '13.5px', paddingLeft: '8px' }}
              >
                {item.label}
              </label>
            ))}
          </div>
          <div className="card_top_more" ref={dropdownRef}>
            <MoreHorizontal onClick={handleDropdownToggle} />
            {showDropdown && (
              <Dropdown class="card_dropdown">
                <p onClick={onOpen} style={{ width: '100px', marginLeft: '-%' }}>
                  Delete Card
                </p>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="card_main_title" onClick={handleCardClick}>
          {title}
        </div>
        <div className="card_footer">
          {date && (
            <p className="card_footer_item">
              <Clock className="card_footer_icon" />
              {formatDate(date)}
            </p>
          )}
          {tasks && tasks?.length > 0 && (
            <p className="card_footer_item">
              <CheckSquare className="card_footer_icon" />
              {tasks?.filter((item) => item.completed)?.length}/{tasks?.length}
            </p>
          )}
        </div>
      </div>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          card={props.card}
          cardId={props.cardId}
          boardId={props.boardId}
          updateCard={props.updateCard}
          key={props.id}
        />
      )}

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent
            maxW="md"
            mx="auto"
            width="25%"
            height="50%"
            my="4"
            p="10"
            bg="white"
            mt= "15%"
            ml="40%"
            rounded="md"
            border = "red"
          >
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Card
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this card?
            </AlertDialogBody>
            <AlertDialogFooter
              gap={40}
           
            >
              <Button 
               colorScheme="blue"
               style={{
                 backgroundColor: "#ffcc00",
                 border: "none",
                 color: "white",
                 padding: "10px 20px",
                 fontSize: "16px",
                 borderRadius: "4px",
                 boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                 cursor: "pointer",
                 transition: "background-color 0.3s, box-shadow 0.3s",
                 marginLeft: "-8%",
                 marginTop: "5%",
               }}
               ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button  colorScheme="blue"
               style={{
                 backgroundColor: "#ff0000",
                 border: "none",
                 color: "white",
                 padding: "10px 20px",
                 fontSize: "16px",
                 borderRadius: "4px",
                 boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                 cursor: "pointer",
                 transition: "background-color 0.3s, box-shadow 0.3s",
                 marginTop: "5%",
               }} onClick={handleDeleteCard} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
