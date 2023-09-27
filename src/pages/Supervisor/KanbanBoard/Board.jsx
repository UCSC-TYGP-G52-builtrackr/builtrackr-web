import React, { useState, useEffect } from "react";
import { KanbanBoard } from "./KanbanBoard";
import "../../../CSS/kanbanBoard.css";
import { Editable } from "../../../components/Editable/Editable";
import { FirstBoard } from "./FirstBoard";
import { Todo } from "./Todo";
import NavBar from "../../../components/SiteSupervisor/NavBar";
import SideBar from "../../../components/SiteSupervisor/SideBar";
import ChatSpace from "../../../components/SiteSupervisor/ChatSpace";
import { BsChatDots } from "react-icons/bs";
import { useStateContext } from "../../../contexts/ContextProvider";
import axios from "axios";

export const Board = () => {
const {
 
  activeMenu,
  themeSettings,
  setThemeSettings,
} = useStateContext();

const [boards, setBoards] = useState([]);


  const addBoardHandler = (name) => {
    const tempBoards = [...boards];
    tempBoards.push({
      id: Date.now() + Math.random() * 2,
      title: name,
      cards: [],
    });
  
    const title  = name;
    const companyId  = 1;
    const SupervisorId =1;

    const data = {title,companyId,SupervisorId};

    axios.post("http://localhost:4000/api/kanbanbord/addBoard", data)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    }
    );
  };



  useEffect(() => {
    const getBoards = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/kanbanbord/getBoard"
        );
        console.log(response.data);
        if (response.status === 200) {
          setBoards(response.data);
        }
      } catch (error) {
        console.log(error);
        console.error("Error fetching board data:", error);
      }
    };
    getBoards();
  }, []);




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
        <br/><br/><br/>

        <div className="kanban">
          <div className="owner_info">
            <div className="name">
            </div>
          </div>

          <div className="board_outer">
            <div className="boards">
              <FirstBoard />
              <Todo />

        {boards.map((board) => (
                <KanbanBoard
                  key={board.id}
                  board= {board}
                  
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
