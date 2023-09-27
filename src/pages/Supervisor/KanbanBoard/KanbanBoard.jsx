// File: KanbanBoard.js
import React, { useState, useEffect, useRef } from "react";
import "../../../CSS/kanbanBoard.css";
import { MoreHorizontal } from "react-feather";
import { Card } from "../../../components/Card/Card";
import {Dropdown} from "../../../components/DropDown/DropDown"
import {Editable} from "../../../components/Editable/Editable"
import axios from "axios";

export const KanbanBoard = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutsideDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };


  useEffect(() => {
    document.addEventListener("click", handleClickOutsideDropdown);

    return () => {
      document.removeEventListener("click", handleClickOutsideDropdown);
    };
  }, []);

  const [cards , setCards] = useState([]);

  const addCardHandler = (name) => {
    const tempCards = [...cards];
    tempCards.push({
      id: Date.now() + Math.random() * 2,
      title: "New Card",
      description: "",
    });
    
    const currentDate  = new Date()
    const title = name;
    const date = currentDate.toLocaleDateString();
    const boardId = props.board?.id;
    const companyId = 1;
    const SupervisorId = 1;

    const data = { title, date, boardId, companyId, SupervisorId };

    axios.post("http://localhost:4000/api/kanbanbord/addCard", data)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    }
    );

  };
  useEffect(() => {
    const getCards = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/kanbanbord/getCard"
        );
        console.log(response.data);
        if (response.status === 200) {
          setCards(response.data);
        }
      } catch (error) {
        console.log(error);
        console.error("Error fetching card data:", error);
      }
    };
    getCards();
  }, []);


  const handleDeleteBoard = () => {
    const boardId = props.board.id;
    const data = { boardId };

    axios.delete(`http://localhost:4000/api/kanbanbord/deleteBoard/${boardId}`, data)
    .then(res => {
        console.log(res)
      }
    )
    .catch(err => {
        console.log(err)
      } 
    )
  }

  const filteredCards = cards.filter((card) => card.boardId === props.board?.id);

  return (
    <>
      <div className="board">
        <div className="board_top">
          <p className="board_top_title">
            {props.board?.title}
           <span>{`${filteredCards?.length || 0}`}</span>
          </p>
          <div className="board_top_more" ref={dropdownRef}>
            <MoreHorizontal onClick={handleDropdownToggle} />
            {showDropdown && props.board?.id !== 1 && props.board?.id !== 2 && (
              <Dropdown className="board_dropdown">
                <p onClick={handleDeleteBoard}>Delete Board</p>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="board_cards custom-scroll">
          {filteredCards?.map((item) => (
            <Card
              key={item.id}
              card={item}
              boardId={props.board?.id}

            />
          ))}
          <Editable
            displayClass="board_card_add"
            text="Add Card"
            placeholder="Enter the card title"
            onSubmit={addCardHandler}
          />
        </div>
      </div>
    </>
  );
};