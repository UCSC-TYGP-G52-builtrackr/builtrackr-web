import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import CloseIcon from "@mui/icons-material/Close";
// import { Button } from '.';
import Button from "./Button";
import { chatData } from "../../data/dummy";
import { useStateContext } from "../../contexts/ContextProvider";

const Notification = ({ notifications }) => {
  const { currentColor } = useStateContext();
  const { setIsClicked, initialState } = useStateContext();
  console.log(notifications);
  console.log("HEllll");

  return (
    <div
      className="absolute p-5 bg-white rounded-lg shadow-2xl nav-item right-5 md:right-40 top-16 w-80"
      style={{ zIndex: "1000" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <p className="text-lg font-semibold dark:text-gray-200">
            Notifications
          </p>
          {/* <button className="p-1 px-2 text-xs text-black rounded bg-orange-theme "> 5 New</button> */}
          <div className="p-1 px-2 text-xs text-black rounded">5 New</div>
        </div>
        {/* <Button icon={<MdOutlineCancel />} color="rgb(153, 171, 180)" bgHoverColor="light-gray" size="lg" borderRadius="50%" /> */}
        <div
          className="text-xl cursor-pointer"
          onClick={() => setIsClicked(initialState)}
        >
          <CloseIcon fontSize="inherit" />
        </div>
      </div>
      <div className="mt-3 ">
        {notifications.map((el, i) => (
          <div
            key={i}
            className="flex items-center gap-5 p-3 leading-8 cursor-pointer border-b-1 border-color hover:bg-slate-50"
          >
            
              <p className="text-sm font-semibold">{el.msg}</p>
          </div>
        ))}
        {/* {chatData?.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-5 p-3 leading-8 cursor-pointer border-b-1 border-color hover:bg-slate-50"
          >
            <img
              className="w-8 h-8 rounded-full"
              src={item.image}
              alt={item.message}
            />
            <div>
              <p className="text-sm font-semibold">{item.message}</p>
              <p className="text-sm text-gray-500"> {item.desc} </p>
            </div>
          </div>
        ))} */}
        <div className="flex items-center justify-center p-4 mt-5 bg-white rounded-lg shadow-2xl cursor-pointer hover:bg-slate-100">
          View All
        </div>
      </div>
    </div>
  );
};

export default Notification;
