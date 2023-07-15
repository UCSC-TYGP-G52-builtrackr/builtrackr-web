import React, { useState, useEffect, useRef } from 'react';
import './card.css';
import { MoreHorizontal, Clock, CheckSquare } from 'react-feather';
import { Dropdown } from '../DropDown/DropDown';
import { CardInfo } from './CardInfo/CardInfo';

export const Card = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
    document.addEventListener('click', handleClickOutsideDropdown);

    return () => {
      document.removeEventListener('click', handleClickOutsideDropdown);
    };
  }, []);

  const { id, title, date, tasks, labels } = props.card;

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
    setShowModal(true);
  };

  const handleDeleteCard = () => {
    props.removeCard(props.boardId, id);
  };

  return (
    <>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          card={props.card}
          boardId={props.boardId}
          updateCard={props.updateCard}
        />
      )}

      <div
        className="card"
        draggable="true"
        onDragEnd={() => props.dragEnded(props.boardId, id)}
        onDragEnter={() => props.dragEntered(props.boardId, id)}
        onClick={handleCardClick}
      >
        <div className="card_title">
          <div className="card_top_labels">
            {labels?.map((item, index) => (
              <labels key={index} style={{ backgroundColor: item.color }}>
                {item.text}
              </labels>
            ))}
          </div>
          <div className="card_top_more">
            <MoreHorizontal onClick={handleDropdownToggle} />
            {showDropdown && (
              <Dropdown class="board_dropdown">
                <p onClick={handleDeleteCard}>Delete Card</p>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="card_main_title">{title}</div>
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
    </>
  );
};
