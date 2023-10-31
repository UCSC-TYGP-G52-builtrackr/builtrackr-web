// File: KanbanBoard.js
import React from "react";
import "../../../CSS/kanbanBoard.css";
import {CardFirst} from "../../../components/Card/Card_pro/Card_pro"



export const FirstBoard = () => {

  return (
    <>
      <div className="board">
        <div className="board_top">
          <p className="board_top_title">
           Project Resources
             <span> 3 </span>
          </p>
            
        </div>
        
        <div className="board_cards custom-scroll">
            <CardFirst/>
        </div>
      </div>
    </>
  );
};