import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { MdKeyboardArrowDown } from "react-icons/md";
import avatar from "../../data/avatar.jpg";
import Notification from "../Notification";
import UserProfile from "../UserProfile";
import { useStateContext } from "../../contexts/ContextProvider";
import { deDE } from "@mui/x-date-pickers";
import { decryptData } from "../../encrypt";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";

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

const NavBar = () => {
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
  const roleName = "Supervisor";
  // const photo = decryptData(JSON.parse(localStorage.getItem("photo")));
  const employeeNo = decryptData(JSON.parse(localStorage.getItem("no")));

  //print localsorage
  console.log(localStorage);

console.log(employeeNo);
  const [siteInfo, setSiteInfo] = useState([]);
 
  
  useEffect(() => {
    const getSiteInfo = async () => {
    axios.get(`http://localhost:4000/api/kanbanbord/getSite?employeeNo=${employeeNo}`).then((response) => {
      setSiteInfo(response.data);
    }).catch((error) => {
      console.error("Error fetching site information:", error);
    });
  };
  getSiteInfo();
  }, [employeeNo]);


  console.log(siteInfo);


const siteArray = siteInfo.site_id;

//save site id to local storage
localStorage.setItem("site_id", JSON.stringify(siteArray));



  const [socket, setSocket] = useState(null);
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setSocket(io("http://localhost:4000/"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", employeeNo);
  }, [socket]);

  useEffect(() => {
    console.log("Hammmeeee");
    socket?.on("getTaskNotification", (data) => {
      setNotification((prev) => [...prev, data]);
    });
  }, [socket]);

  // console.log(notification);


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
      <div className="flex gap-2">
        <div
          className="text-4xl cursor-pointer"
          onClick={() => handleClick("notification")}
        >
          <NotificationsNoneIcon fontSize="inherit" />
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

        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default NavBar;
