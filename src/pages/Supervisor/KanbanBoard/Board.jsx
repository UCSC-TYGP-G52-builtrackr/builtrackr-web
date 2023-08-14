import React, { useState, useEffect } from "react";
import { KanbanBoard } from "./KanbanBoard";
import "../../../CSS/kanbanBoard.css";
import { Editable } from "../../../components/Editable/Editable";
import { FirstBoard } from "./FirstBoard";
import avatar from "../../../data/avatar2.jpg";
import { Todo } from "./Todo";
import NavBar from "../../../components/SiteSupervisor/NavBar";
import SideBar from "../../../components/SiteSupervisor/SideBar";
import ChatSpace from "../../../components/SiteSupervisor/ChatSpace";
import { BsChatDots } from "react-icons/bs";
import { useStateContext } from "../../../contexts/ContextProvider";

export const Board = () => {
const {
  setCurrentColor,
  setCurrentMode,
  currentMode,
  activeMenu,
  themeSettings,
  setThemeSettings,
} = useStateContext();
  const [boards, setBoards] = useState(
    JSON.parse(localStorage.getItem("prac-kanban")) || []
  );
  const [targetCard, setTargetCard] = useState({
    bid: "",
    cid: "",
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
      equipment: [],
      date: "",
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

    const s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
      (item) => item.id === cid
    );
    if (s_cardIndex < 0) return;

    const t_boardIndex = boards.findIndex((item) => item.id === targetCard.bid);
    if (t_boardIndex < 0) return;

    const t_cardIndex = boards[t_boardIndex]?.cards?.findIndex(
      (item) => item.id === targetCard.cid
    );
    if (t_cardIndex < 0) return;

    const tempBoards = [...boards];
    const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
    tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
    tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);
    setBoards(tempBoards);

    setTargetCard({
      bid: "",
      cid: "",
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

    updatedBoards[boardIndex].cards[cardIndex] = card;
    setBoards(updatedBoards);
  };

  useEffect(() => {
    localStorage.setItem("prac-kanban", JSON.stringify(boards));
  }, [boards]);

  return (
    <>
      <div className="relative flex dark:bg-main-dark-bg w:100">
        {/* chatbot popup */}
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <button
            type="button"
            onClick={() => setThemeSettings(true)}
            style={{ backgroundColor: "yellow-400", borderRadius: "50%" }}
            className="p-3 text-3xl text-white bg-yellow-400 hover:drop-shadow-xl"
          >
            <BsChatDots />
          </button>
        </div>

        {activeMenu ? (
          <div className="fixed bg-white w-72 sidebar dark:bg-secondary-dark-bg ">
            <SideBar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <SideBar />
          </div>
        )}
      </div>
      <div className="fixed w:100% md:static bg-main-bg dark:bg-main-dark-bg navbar ">
        <NavBar />
      </div>
      {themeSettings && <ChatSpace />}

      <div
        className={
          activeMenu
            ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
            : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
        }
      >
        <div className="kanban">
          <div className="owner_info">
            <div className="name">
              {/* <div><span className="ml-1 text-[16px]  text-black text-end items-end">
              Project Owner
              <br/><b>Michael Scott </b>
              </span> */}
            </div>
          </div>

          <div className="board_outer">
            <div className="boards">
              <FirstBoard />
              <Todo />
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
      </div>
    </>
  );
};
