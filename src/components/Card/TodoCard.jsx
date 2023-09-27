import React from 'react';
import './card.css';
// import Box from '@mui/joy/Box';
// import Button from '@mui/joy/Button';
// import Modal from '@mui/joy/Modal';
// import ModalDialog from '@mui/joy/ModalDialog';
// import Typography from '@mui/joy/Typogra
export const TodoCard = (props) => {
 

  const title = props.card[1];
  const id  = props.card[0];
  const date  = props.card[2];
  
  const { onClick } = props;

  return (
    <>
      <div className="card_1" onClick={onClick} >
        <div className="card_title">
          <div className="card_top_labels">
          </div>
          <div className="card_top_more">

          </div>
        </div>
        <div className="card_main_title" >Task Id :{id}</div>
        <div className="card_main_title" >{title}</div>

      </div>
    </>
  );
};