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
import { decryptData } from "../../../encrypt";
import { WiHail } from "weather-icons-react";

// import Weather from "./Weather";

export const Board = () => {
  const { activeMenu, themeSettings, setThemeSettings } = useStateContext();

  const [boards, setBoards] = useState([]);
  const companyId = decryptData(JSON.parse(localStorage.getItem("company_id")));
  const SupervisorId = decryptData(JSON.parse(localStorage.getItem("no")));
  const siteId = localStorage.getItem("site_id");

  const addBoardHandler = (name) => {
    const tempBoards = [...boards];
    tempBoards.push({
      id: Date.now() + Math.random() * 2,
      title: name,
      cards: [],
    });

    const title = name;

    console.log(companyId, SupervisorId);

    const data = { title, companyId, SupervisorId, siteId };
    console.log(data);

    axios
      .post("http://localhost:4000/api/kanbanbord/addBoard", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    //reload
    window.location.reload();
  };

  useEffect(() => {
    const getBoards = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/kanbanbord/getBoard?siteId=${siteId}`
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
  }, [siteId]);


  const [weatherDetails, setWeatherDetails] = useState({
    city_name: "",
    temp: null,
    desc: ""
  });

  const onChangeHandler = event => {
    let name = event.target.name;
    let value = event.target.value;
    setWeatherDetails(weatherDetails => ({
      ...weatherDetails,
      [name]: value
    }));
  };

  // const fetchData = () => {
  //   console.log(weatherDetails.city_name);
  //   fetch(
  //     `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={640d92cefdea3417233d5da4d8c455b1}`
  //   )
  //     .then(response => {
  //       console.log(response.status);
  //       if (response.status === 404) {
  //         alert("No city found!");
  //         setWeatherDetails({
  //           ...weatherDetails,
  //           temp: "",
  //           desc: ""
  //         });
  //       } else if (response.status === 400) {
  //         alert("City name is required!");
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       console.log(data);
  //       setWeatherDetails({
  //         ...weatherDetails,
  //         temp: Math.round(data.main.temp - 273.15),
  //         desc: data.weather[0].description
  //       });
  //     })
  //     .catch(error => console.log(error));
  // };


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
        <br />
        <br />
        <br />

        <div className="kanban">
          <div className="owner_info">
            <div className="name">
              
           <span>Today Weather: 83 °F Heavy rain</span><WiHail  size={35}/>
            </div>
          </div>

          <div className="board_outer">
            <div className="boards">
              <FirstBoard />
              <Todo />

              {boards.map((board) => (
                <KanbanBoard key={board.id} board={board} />
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
