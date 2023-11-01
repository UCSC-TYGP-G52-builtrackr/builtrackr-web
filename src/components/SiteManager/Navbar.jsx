import React, { useState, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import avatar from "../../data/avatar.jpg";
import Notification from "./Notification";
import UserProfile from "./UserProfile";
import { useStateContext } from "../../contexts/ContextProvider";
import { decryptData } from "../../encrypt";
import { io } from "socket.io-client";
import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <button
    type="button"
    onClick={() => customFunc()}
    style={{ color }}
    className="relative p-3 text-xl rounded-full hover:bg-light-gray"
  >
    <span
      style={{ background: dotColor }}
      className="absolute inline-flex w-2 h-2 rounded-full right-2 top-2"
    />
    {icon}
  </button>
);

const Navbar = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();

  const name = decryptData(JSON.parse(localStorage.getItem("name")));
  // const roleName = decryptData(JSON.parse(localStorage.getItem("role_name")));
  const roleName = "Site Manager";
  // const photo = decryptData(JSON.parse(localStorage.getItem("photo")));
  const photo = "avatar.jpg";
  const employeeNo = decryptData(JSON.parse(localStorage.getItem("no")));

  const [socket, setSocket] = useState(null);
  const [notification, setNotification] = useState([]);
  useEffect(() => {
    setSocket(io("http://localhost:4000/"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", employeeNo);
  }, [socket]);

  useEffect(() => {
    console.log("First")
    socket?.on("getEquipmentAcceptNotification", (data) => {
      console.log("data ",data)
      setNotification((prev) => [...prev, data]);
    });
  }, [socket]);

  console.log(notification)

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div
      className="relative flex justify-end p-2 pr-8 bg-white"
      style={{ position: "fixed", right: 0 }}
    >
      <div className="flex gap-4">
        <div
          className="text-4xl cursor-pointer"
          onClick={() => handleClick("notification")}
        >
          {notification.length > 0 ? (
            <Badge badgeContent={notification.length} color="primary">
              <NotificationsNoneIcon />
            </Badge>
          ) : (
            <NotificationsNoneIcon />
          )}
        </div>
        {/* <NavButton title="Notification" dotColor="rgb(254, 201, 15)" customFunc={() => handleClick('notification')} icon={<RiNotification3Line style={{ color: 'black', fontSize: '28px' }}/>} /> */}
        <div
          className="flex items-center gap-2 p-1 rounded-lg cursor-pointer hover:bg-light-gray"
          onClick={() => handleClick("userProfile")}
        >
          <p style={{ display: "flex", flexDirection: "column" }}>
            <span className="text-[16px] font-bold text-black">{name}</span>
            <span className="float-right text-sm">{roleName}</span>
          </p>
          <MdKeyboardArrowDown className="text-gray-400 text-14" />
          {/* <img
            className="w-10 h-10 rounded-full"
            src={`http://localhost:4000/employees/${photo}`}
            alt="user-profile"
          /> */}
        </div>

        {isClicked.notification && (
          <Notification
            notification={notification}
            setNotification={setNotification}
          />
        )}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
