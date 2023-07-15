// File: KanbanBoard.js
import React, { useState, useEffect, useRef } from "react";
import "../../CSS/kanbanBoard.css";
import { MoreHorizontal } from "react-feather";
import { Card } from "../../components/Card/Card";
import {Dropdown} from "../../components/DropDown/DropDown"
import {Editable} from "../../components/Editable/Editable"

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

  return (
    <>
      <div className="board">
        <div className="board_top">
          <p className="board_top_title">
            {props.board?.title}
           <span>{`${props.board?.cards?.length || 0}`}</span>
          </p>
          <div className="board_top_more" ref={dropdownRef}>
            <MoreHorizontal onClick={handleDropdownToggle} />

            {showDropdown && (
              <Dropdown class="board_dropdown">
                <p onClick={() => props.removeBoard(props.board?.id)}>Delete Board</p>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="board_cards custom-scroll">
          {props.board?.cards?.map((item) => (
            <Card
              key={item.id}
              card={item}
              removeCard={props.removeCard}
              boardId={props.board?.id}
              dragEnded={props.dragEnded}
              dragEntered={props.dragEntered}
              updateCard={props.updateCard}
            />
          ))}
          <Editable
            displayClass="board_card_add"
            text="Add Card"
            placeholder="Enter the card title"
            onSubmit={(value) => props.addCard(props.board?.id, value)}
          />
        </div>
      </div>
    </>
  );
};