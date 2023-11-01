import React, { useState, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { MdKeyboardArrowDown } from "react-icons/md";
import avatar from "../../data/InventoryManager/avatar.jpg";
import Notification from "./Notification";
import UserProfile from "./UserProfile";
import { useStateContext } from "../../contexts/ContextProvider";
import { decryptData } from "../../encrypt";
import Badge from "@mui/material/Badge";
import { io } from "socket.io-client";

// const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
//     <button
//       type="button"
//       onClick={() => customFunc()}
//       className="relative"
//     >
//       <span
//         style={{ background: dotColor }}
//         className="absolute inline-flex w-2 h-2 rounded-full right-2 top-2"
//       />
//       {icon}
//     </button>
// );

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
  const employeeNo = decryptData(JSON.parse(localStorage.getItem("no")));

  const [socket, setSocket] = useState(null);
  const [notification, setNotification] = useState([]);

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

  useEffect(() => {
    setSocket(io("http://localhost:4000/"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", employeeNo);
  }, [socket]);

  useEffect(() => {
    socket?.on("getEquipmentNotification", (data) => {
      setNotification((prev) => [...prev, data]);
    });
  }, [socket]);
  console.log(notification);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="relative flex justify-end p-2 pr-8 bg-white">
      <div className="flex gap-2">
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
          <p>
            <div>
              <span className="ml-1 text-[16px] font-bold text-black">
                {name}
              </span>
            </div>
            <span className="float-right text-sm">Inventory Manager</span>
          </p>
          <MdKeyboardArrowDown className="text-gray-400 text-14" />
          <img
            className="w-10 h-10 rounded-full"
            src={avatar}
            alt="user-profile"
          />
        </div>

        {isClicked.notification && <Notification notification={notification} />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
