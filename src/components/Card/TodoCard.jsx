import React from 'react';
import './card.css';


export const TodoCard = (props) => {
 

  const title  = props.card[1];
  const id  = props.card[0];
  const date  = props.card[2];


  return (
    <>
      

      <div className="card_1" >
        <div className="card_title">
          <div className="card_top_labels">
          </div>
          <div className="card_top_more">

          </div>
        </div>
        <div className="card_main_title">{title}</div>

      </div>
    </>
  );
};