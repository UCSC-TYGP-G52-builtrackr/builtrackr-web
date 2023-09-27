import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import avatar from "../../data/avatar.jpg";
import Notification from "../../components/Notification";
import UserProfile from "../../components/UserProfile";
import { useStateContext } from "../../contexts/ContextProvider";
import { decryptData } from "../../encrypt";

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
  const name = decryptData(JSON.parse(localStorage.getItem("name")));
  const roleName = decryptData(JSON.parse(localStorage.getItem("role_name")));
  const photo = decryptData(JSON.parse(localStorage.getItem("photo")));

  return (
    <div className="relative flex gap-10 justify-end p-1.5 md:ml-10 md:mr-1">
      {/* <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} /> */}
      <div className="flex">
        <NavButton
          title="Notification"
          dotColor="rgb(254, 201, 15)"
          customFunc={() => handleClick("notification")}
          color={currentColor}
          icon={
            <RiNotification3Line style={{ color: "black", fontSize: "28px" }} />
          }
        />
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
            <span className="float-right text-sm">{roleName}</span>
          </p>
          <MdKeyboardArrowDown className="text-gray-400 text-14" />
          <img
            className="w-10 h-10 rounded-full"
            src={`http://localhost:4000/employees/${photo}`}
            alt="user-profile"
          />
        </div>

        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
