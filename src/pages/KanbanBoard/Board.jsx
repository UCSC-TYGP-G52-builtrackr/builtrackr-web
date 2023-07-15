import React, { useState, useEffect } from 'react';
import {KanbanBoard} from "./KanbanBoard";
import '../../CSS/kanbanBoard.css';
import { Editable } from '../../components/Editable/Editable';
import { FirstBoard } from './FirstBoard';
import avatar from '../../data/avatar2.jpg';


export const Board = () => {
  const [boards, setBoards] = useState(JSON.parse(localStorage.getItem('prac-kanban')) || []);
  const [targetCard, setTargetCard] = useState({
    bid: '',
    cid: '',
  });

  const addBoardHandler = (name) => {
    const tempBoards = [...boards];
    tempBoards.push({
      id: Date.now() + Math.random() * 2,
      title: name,
      cards: [],
    });
    setBoards(tempBoards);
  };

  const removeBoard = (id) => {
    const updatedBoards = boards.filter((item) => item.id !== id);
    setBoards(updatedBoards);
  };

  const addCardHandler = (id, title) => {
    const updatedBoards = [...boards];
    const boardIndex = updatedBoards.findIndex((item) => item.id === id);
    if (boardIndex < 0) return;

    updatedBoards[boardIndex].cards.push({
      id: Date.now() + Math.random() * 2,
      title,
      labels: [],
      labors: [],
      equipment:[],
      date: '',
      tasks: [],
    });
    setBoards(updatedBoards);
  };

  const removeCard = (bid, cid) => {
    const updatedBoards = [...boards];
    const boardIndex = updatedBoards.findIndex((item) => item.id === bid);
    if (boardIndex < 0) return;

    const cards = updatedBoards[boardIndex].cards;
    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    cards.splice(cardIndex, 1);
    setBoards(updatedBoards);
  };

  const dragEnded = (bid, cid) => {
    const s_boardIndex = boards.findIndex((item) => item.id === bid);
    if (s_boardIndex < 0) return;

    const s_cardIndex = boards[s_boardIndex]?.cards?.findIndex((item) => item.id === cid);
    if (s_cardIndex < 0) return;

    const t_boardIndex = boards.findIndex((item) => item.id === targetCard.bid);
    if (t_boardIndex < 0) return;

    const t_cardIndex = boards[t_boardIndex]?.cards?.findIndex((item) => item.id === targetCard.cid);
    if (t_cardIndex < 0) return;

    const tempBoards = [...boards];
    const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
    tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
    tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);
    setBoards(tempBoards);

    setTargetCard({
      bid: '',
      cid: '',
    });
  };

  const dragEntered = (bid, cid) => {
    if (targetCard.cid === cid) return;
    setTargetCard({
      bid,
      cid,
    });
  };

  const updateCard = (bid, cid, card) => {
    const boardIndex = boards.findIndex((item) => item.id === bid);
    if (boardIndex < 0) return;

    const updatedBoards = [...boards];
    const cards = updatedBoards[boardIndex].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    updatedBoards[boardIndex ].cards[cardIndex] = card;
    setBoards(updatedBoards);
  };

  useEffect(() => {
    localStorage.setItem('prac-kanban', JSON.stringify(boards));
  }, [boards]);

  return (
    <>
      <div className="kanban"> 
     
        <div className="board_outer">
        
<div className="owner_info"> 
       <div  className="name">
            
              <div><span className="ml-1 text-[16px]  text-black text-end items-end">
              Project Owner
              <br/><b>Michael Scott </b>
              </span>
    </div>
            
            
        
            <img
              className="w-12 h-12 rounded-full"
              src={avatar}
              alt="user-profile"
            />
          </div>


</div>
          <div className="boards"> 
            
            <FirstBoard/>
            {boards.map((item) => (
              <KanbanBoard
                key={item.id}
                board={item}
                addCard={addCardHandler}
                removeBoard={() => removeBoard(item.id)}
                removeCard={removeCard}
                dragEntered={dragEntered}
                dragEnded={dragEnded}
                updateCard={updateCard}
              />
            ))}
            <div className="add_board">
              <Editable
                displayClass="app_boards_add-board"
                editClass="app_boards_add-board_edit"
                text="Add Board"
                placeholder="Enter Board Title"
                onSubmit={addBoardHandler}
              />
            </div>
          </div>
        </div>
      </div>
      
    
    </>
  );
};
