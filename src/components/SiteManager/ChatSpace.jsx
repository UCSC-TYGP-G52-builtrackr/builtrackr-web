import React, { useState, useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { BsCheck } from "react-icons/bs";
// import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import SendIcon from "@mui/icons-material/Send";
import { decryptData } from "../../encrypt";
import { themeColors } from "../../data/dummy";
import { useStateContext } from "../../contexts/ContextProvider";
import { io } from "socket.io-client";

const ChatSpace = () => {
  const { setColor, setMode, currentMode, currentColor, setThemeSettings } =
    useStateContext();

  const employee_no = parseInt(
    decryptData(JSON.parse(localStorage.getItem("no")))
  );
  console.log("emp",employee_no);
  const name = decryptData(JSON.parse(localStorage.getItem("name")));
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(io("http://localhost:4000/"));
  }, []);
  console.log(socket);

  // useEffect(() => {
  //   socket?.emit("newUser", employee_no);
  // }, [socket]);

  const sendMessage = async() => {
    if (msg !== "") {
      const messageData = {
        sender: employee_no,
        name: name,
        message: msg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("sendMessage", messageData);
      setMsg("");
    }
  };
  useEffect(() => {
    socket?.on("receiveMessage", (data) => {
      setMessages((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="fixed top-0 right-0 w-screen bg-half-transparent nav-item">
      <div
        style={{ backgroundColor: "#efefef", width: "300px" }}
        className="float-right h-screen dark:text-gray-200  bg-white dark:bg-#484B52 w-400"
      >
        <div
          style={{ gap: "20px" }}
          className="flex items-center justify-between p-4 ml-4"
        >
          <p className="text-lg font-semibold">Chat Here</p>
          <button
            type="button"
            onClick={() => setThemeSettings(false)}
            style={{ color: "rgb(153, 171, 180)", borderRadius: "50%" }}
            className="p-3 text-lg hover:drop-shadow-xl hover:bg-light-gray"
          >
            <MdOutlineCancel />
          </button>
        </div>
        {/* <div className="flex-col p-4 ml-4 border-t-1 border-color">
        <p className="text-xl font-semibold ">Theme Option</p>

        <div className="mt-4">
          <input
            type="radio"
            id="light"
            name="theme"
            value="Light"
            className="cursor-pointer"
            onChange={setMode}
            checked={currentMode === 'Light'}
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        {/* <label htmlFor="light" className="ml-2 cursor-pointer text-md">
            Light
          </label>
        </div>
        <div className="mt-2">
          <input
            type="radio"
            id="dark"
            name="theme"
            value="Dark"
            onChange={setMode}
            className="cursor-pointer"
            checked={currentMode === 'Dark'}
          /> */}
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        {/* <label htmlFor="dark" className="ml-2 cursor-pointer text-md">
            Dark
          </label>
        </div>
      </div> */}
        {/* <div className="p-4 ml-4 border-t-1 border-color">
        <p className="text-xl font-semibold ">Theme Colors</p>
        <div className="flex gap-3">
          {themeColors.map((item, index) => (
            <TooltipComponent key={index} content={item.name} position="TopCenter">
              <div
                className="relative flex items-center gap-5 mt-2 cursor-pointer"
                key={item.name}
              >
                <button
                  type="button"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  style={{ backgroundColor: item.color }}
                  onClick={() => setColor(item.color)}
                >
                  <BsCheck className={`ml-2 text-2xl text-white ${item.color === currentColor ? 'block' : 'hidden'}`} />
                </button>
              </div>
            </TooltipComponent>
          ))}
        </div>
      </div> */}
        <div
          style={{
            backgroundColor: "#ffffee",
            height: "770px",
            width: "280px",
            margin: "0 auto",
            borderRadius: "10px",
            padding: "18px",
            overflowY:"scroll"
          }}
        >
          {messages.map((el, i) =>
            el.sender === employee_no ? (
              <MyMessages data={el} key={i} />
            ) : (
              <OthersMessages data={el} key={i} />
            )
          )}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "0",
            display: "flex",
            gap: "10px",
          }}
        >
          <input
            style={{
              backgroundColor: "white",
              width: "250px",
              marginLeft: "10px",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
              paddingLeft: "10px",
            }}
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Enter message"
          />
          <SendIcon
            style={{ marginTop: "5px", cursor: "pointer" }}
            onClick={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

const MyMessages = ({ data }) => {
  return (
    <div
      style={{
        width: "200px",
        padding: "10px",
        textAlign: "right",
        margin: "10px 0 10px 55px",
      }}
    >
      <h4>{data.name}</h4>
      <p>{data.message}</p>
      <h6>{data.time}</h6>
    </div>
  );
};

const OthersMessages = ({ data }) => {
  return (
    <div
      style={{
        width: "200px",
        padding: "10px",
      }}
    >
      <h4>{data.name}</h4>
      <h1>{data.message}</h1>
      <h5>{data.time}</h5>
    </div>
  );
};

export default ChatSpace;
