import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
<<<<<<< HEAD
import CloseIcon from '@mui/icons-material/Close';
=======

>>>>>>> dev
// import { Button } from '.';
import Button from './Button';
import { chatData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

const Notification = () => {
  const { currentColor } = useStateContext();
<<<<<<< HEAD
  const { setIsClicked, initialState } = useStateContext();

  return (
    <div className="absolute p-5 bg-white rounded-lg shadow-2xl nav-item right-5 md:right-40 top-16 w-80">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <p className="text-lg font-semibold dark:text-gray-200">Notifications</p>
          {/* <button className="p-1 px-2 text-xs text-black rounded bg-orange-theme "> 5 New</button> */}
          <div className='p-1 px-2 text-xs text-black rounded'>5 New</div>
        </div>
        {/* <Button icon={<MdOutlineCancel />} color="rgb(153, 171, 180)" bgHoverColor="light-gray" size="lg" borderRadius="50%" /> */}
        <div className='text-xl cursor-pointer'onClick={() => setIsClicked(initialState)}>
          <CloseIcon fontSize="inherit" />
        </div>
      </div>
      <div className="mt-3 ">
        {chatData?.map((item, index) => (
          <div key={index} className="flex items-center gap-5 p-3 leading-8 cursor-pointer border-b-1 border-color hover:bg-slate-50">
=======

  return (
    <div className="absolute p-5 bg-white rounded-lg nav-item right-5 md:right-40 top-16 w-80">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <p className="text-lg font-semibold dark:text-gray-200">Notifications</p>
          <button type="button" className="p-1 px-2 text-xs text-black rounded bg-orange-theme "> 5 New</button>
        </div>
        <Button icon={<MdOutlineCancel />} color="rgb(153, 171, 180)" bgHoverColor="light-gray" size="lg" borderRadius="50%" />
      </div>
      <div className="mt-3 ">
        {chatData?.map((item, index) => (
          <div key={index} className="flex items-center gap-5 p-3 leading-8 border-b-1 border-color">
>>>>>>> dev
            <img className="w-8 h-8 rounded-full" src={item.image} alt={item.message} />
            <div>
              <p className="text-sm font-semibold">{item.message}</p>
              <p className="text-sm text-gray-500"> {item.desc} </p>
            </div>
          </div>
        ))}
<<<<<<< HEAD
        <div className="flex items-center justify-center p-4 mt-5 bg-white rounded-lg shadow-2xl cursor-pointer hover:bg-slate-100">
          {/* <Button color="black" text="View All" borderRadius="10px" width="full" /> */}
          View All
=======
        <div className="mt-5 bg-gray-300 rounded-lg">
          <Button color="black" bgColor="yellow-400" text="View All" borderRadius="10px" width="full" />
>>>>>>> dev
        </div>
      </div>
    </div>
  );
};

export default Notification;